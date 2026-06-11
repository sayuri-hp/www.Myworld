import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Clock, Star } from 'lucide-react';

const SYMBOLS = ['🐉', '🦋', '🌸', '⚡', '🎯', '🔮', '🌙', '💎'];

interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

function createDeck(): Card[] {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  return shuffled.map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [won, setWon] = useState(false);

  const totalPairs = SYMBOLS.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (running && !won) {
      timer = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running, won]);

  const handleFlip = useCallback((cardId: number) => {
    if (isChecking || won) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;
    if (flipped.length === 2) return;

    if (!running) setRunning(true);

    const newFlipped = [...flipped, cardId];
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(m => m + 1);

      const [firstId, secondId] = newFlipped;
      const first = cards.find(c => c.id === firstId)!;
      const second = card;

      if (first.symbol === second.symbol) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
          ));
          const newMatches = matches + 1;
          setMatches(newMatches);
          setFlipped([]);
          setIsChecking(false);

          if (newMatches === totalPairs) {
            setWon(true);
            setRunning(false);
            if (!bestScore || moves + 1 < bestScore) setBestScore(moves + 1);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [cards, flipped, isChecking, matches, moves, running, totalPairs, won, bestScore]);

  const reset = () => {
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
    setElapsed(0);
    setRunning(false);
    setWon(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Stats */}
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-black text-purple-400">{moves}</div>
          <div className="text-xs text-gray-500">Moves</div>
        </div>
        <div>
          <div className="text-2xl font-black text-white flex items-center gap-1 justify-center">
            <Clock className="w-4 h-4 text-gray-400" />
            {formatTime(elapsed)}
          </div>
          <div className="text-xs text-gray-500">Time</div>
        </div>
        <div>
          <div className="text-2xl font-black text-green-400">{matches}/{totalPairs}</div>
          <div className="text-xs text-gray-500">Matched</div>
        </div>
        {bestScore && (
          <div>
            <div className="text-2xl font-black text-yellow-400 flex items-center gap-1 justify-center">
              <Star className="w-4 h-4" />
              {bestScore}
            </div>
            <div className="text-xs text-gray-500">Best</div>
          </div>
        )}
      </div>

      {won && (
        <div className="text-center py-3 px-6 bg-green-900/20 border border-green-500/30 rounded-xl">
          <div className="text-2xl mb-1">🎊</div>
          <div className="text-green-400 font-bold">You matched all pairs!</div>
          <div className="text-gray-400 text-sm">{moves} moves in {formatTime(elapsed)}</div>
        </div>
      )}

      {/* Board */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            disabled={card.matched || isChecking}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-2xl transition-all duration-300 border ${
              card.matched
                ? 'bg-green-900/20 border-green-500/30 cursor-default scale-95'
                : card.flipped
                ? 'bg-purple-900/30 border-purple-500/50 shadow-lg shadow-purple-500/20'
                : 'bg-white/5 border-white/10 hover:bg-purple-900/20 hover:border-purple-600/30'
            }`}
          >
            {card.flipped || card.matched ? card.symbol : (
              <span className="text-gray-600 text-sm">?</span>
            )}
          </button>
        ))}
      </div>

      <button onClick={reset} className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-sm transition-colors">
        <RefreshCw className="w-4 h-4" /> New Game
      </button>
    </div>
  );
}
