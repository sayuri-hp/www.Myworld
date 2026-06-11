import { useState } from 'react';
import { RefreshCw, Target, TrendingUp, TrendingDown } from 'lucide-react';

export default function NumberGuess() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(10);
  const [history, setHistory] = useState<{ value: number; hint: 'high' | 'low' | 'correct' }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const getRange = () => {
    let low = 1, high = 100;
    history.forEach(h => {
      if (h.hint === 'high') high = Math.min(high, h.value - 1);
      if (h.hint === 'low') low = Math.max(low, h.value + 1);
    });
    return { low, high };
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === target) {
      setHistory(h => [...h, { value: num, hint: 'correct' }]);
      setWon(true);
      setGameOver(true);
      if (!bestScore || newAttempts < bestScore) setBestScore(newAttempts);
    } else if (num > target) {
      setHistory(h => [...h, { value: num, hint: 'high' }]);
      if (newAttempts >= maxAttempts) setGameOver(true);
    } else {
      setHistory(h => [...h, { value: num, hint: 'low' }]);
      if (newAttempts >= maxAttempts) setGameOver(true);
    }

    setGuess('');
  };

  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setHistory([]);
    setGameOver(false);
    setWon(false);
  };

  const { low, high } = getRange();
  const attemptsLeft = maxAttempts - attempts;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Stats row */}
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-black text-purple-400">{maxAttempts}</div>
          <div className="text-xs text-gray-500">Max Tries</div>
        </div>
        <div>
          <div className={`text-2xl font-black ${attemptsLeft <= 3 ? 'text-red-400' : 'text-white'}`}>{attemptsLeft}</div>
          <div className="text-xs text-gray-500">Left</div>
        </div>
        {bestScore && (
          <div>
            <div className="text-2xl font-black text-yellow-400">{bestScore}</div>
            <div className="text-xs text-gray-500">Best</div>
          </div>
        )}
      </div>

      {/* Range hint */}
      <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
        <Target className="w-4 h-4 text-purple-400" />
        <span className="text-gray-300 text-sm">
          Range: <span className="text-purple-400 font-mono font-bold">{low} — {high}</span>
        </span>
      </div>

      {/* Game over display */}
      {gameOver ? (
        <div className={`text-center py-4 px-8 rounded-xl border ${won ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'}`}>
          {won ? (
            <>
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-green-400 font-bold text-lg">You got it!</div>
              <div className="text-gray-400 text-sm">The number was <span className="text-white font-bold">{target}</span></div>
              <div className="text-gray-400 text-sm">Solved in <span className="text-purple-400 font-bold">{attempts}</span> attempts</div>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">😢</div>
              <div className="text-red-400 font-bold text-lg">Out of guesses!</div>
              <div className="text-gray-400 text-sm">The number was <span className="text-white font-bold">{target}</span></div>
            </>
          )}
        </div>
      ) : (
        /* Input */
        <div className="flex gap-3">
          <input
            type="number"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGuess()}
            placeholder="1 - 100"
            min={1}
            max={100}
            className="w-28 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-center font-mono focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button onClick={handleGuess} className="btn-primary px-5 py-2.5">
            Guess
          </button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-xs">
          <div className="text-xs text-gray-500 mb-2 text-center">Guess History</div>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((h, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-mono font-bold ${
                  h.hint === 'correct'
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                    : h.hint === 'high'
                    ? 'bg-red-900/20 text-red-400 border border-red-500/20'
                    : 'bg-blue-900/20 text-blue-400 border border-blue-500/20'
                }`}
              >
                {h.hint === 'high' ? <TrendingDown className="w-3 h-3" /> : h.hint === 'low' ? <TrendingUp className="w-3 h-3" /> : '✓'}
                {h.value}
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={reset} className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-sm transition-colors">
        <RefreshCw className="w-4 h-4" /> New Game
      </button>
    </div>
  );
}
