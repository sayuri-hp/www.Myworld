import { useState } from 'react';
import { RefreshCw, Trophy, Minus, X as XIcon } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw' | null;

const choices: Choice[] = ['rock', 'paper', 'scissors'];

const emojis: Record<Choice, string> = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
};

const beats: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const play = (choice: Choice) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    setTimeout(() => {
      const computer = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computer);

      let outcome: Result;
      if (choice === computer) {
        outcome = 'draw';
        setScore(s => ({ ...s, draws: s.draws + 1 }));
      } else if (beats[choice] === computer) {
        outcome = 'win';
        setScore(s => ({ ...s, wins: s.wins + 1 }));
      } else {
        outcome = 'lose';
        setScore(s => ({ ...s, losses: s.losses + 1 }));
      }
      setResult(outcome);
      setIsAnimating(false);
    }, 800);
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  const resultConfig: Record<NonNullable<Result>, { label: string; color: string; icon: React.ReactNode }> = {
    win: { label: 'You Win! 🎉', color: 'text-green-400', icon: <Trophy className="w-5 h-5 text-green-400" /> },
    lose: { label: 'Computer Wins!', color: 'text-red-400', icon: <XIcon className="w-5 h-5 text-red-400" /> },
    draw: { label: "It's a Draw!", color: 'text-yellow-400', icon: <Minus className="w-5 h-5 text-yellow-400" /> },
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Score */}
      <div className="flex gap-6">
        {[
          { label: 'Wins', value: score.wins, color: 'text-green-400' },
          { label: 'Draws', value: score.draws, color: 'text-yellow-400' },
          { label: 'Losses', value: score.losses, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Battle display */}
      <div className="flex items-center justify-between w-full max-w-xs gap-4">
        <div className="flex-1 text-center">
          <div className="text-xs text-gray-400 mb-2">You</div>
          <div className={`text-6xl transition-all duration-300 ${playerChoice ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            {playerChoice ? emojis[playerChoice] : '❓'}
          </div>
        </div>
        <div className="text-xl font-bold text-purple-400">VS</div>
        <div className="flex-1 text-center">
          <div className="text-xs text-gray-400 mb-2">CPU</div>
          <div className={`text-6xl transition-all duration-300 ${computerChoice ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            {isAnimating ? '🤔' : computerChoice ? emojis[computerChoice] : '❓'}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="h-8 flex items-center">
        {result && (
          <div className={`flex items-center gap-2 font-bold text-lg ${resultConfig[result].color}`}>
            {resultConfig[result].icon}
            {resultConfig[result].label}
          </div>
        )}
        {isAnimating && <div className="text-gray-400 animate-pulse">Thinking...</div>}
      </div>

      {/* Choices */}
      <div className="flex gap-4">
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => play(choice)}
            disabled={isAnimating}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
              playerChoice === choice
                ? 'border-purple-500 bg-purple-900/30 scale-110'
                : 'border-white/10 bg-white/5 hover:border-purple-600/50 hover:bg-purple-900/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="text-3xl">{emojis[choice]}</span>
            <span className="text-xs text-gray-400 capitalize">{choice}</span>
          </button>
        ))}
      </div>

      <button onClick={reset} className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-sm transition-colors">
        <RefreshCw className="w-4 h-4" /> Reset Score
      </button>
    </div>
  );
}
