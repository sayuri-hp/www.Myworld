import { useState } from 'react';
import { Gamepad2, Scissors, Hash, Grid3X3, Brain } from 'lucide-react';
import RockPaperScissors from './games/RockPaperScissors';
import NumberGuess from './games/NumberGuess';
import TicTacToe from './games/TicTacToe';
import MemoryGame from './games/MemoryGame';

const games = [
  {
    id: 'rps',
    title: 'Rock Paper Scissors',
    description: 'Challenge the computer! Can you outsmart it?',
    icon: <Scissors className="w-5 h-5" />,
    component: <RockPaperScissors />,
  },
  {
    id: 'guess',
    title: 'Number Guessing',
    description: 'Guess the number between 1-100 in 10 tries!',
    icon: <Hash className="w-5 h-5" />,
    component: <NumberGuess />,
  },
  {
    id: 'ttt',
    title: 'Tic Tac Toe',
    description: 'Classic 2-player X vs O battle!',
    icon: <Grid3X3 className="w-5 h-5" />,
    component: <TicTacToe />,
  },
  {
    id: 'memory',
    title: 'Memory Cards',
    description: 'Match all emoji pairs as fast as you can!',
    icon: <Brain className="w-5 h-5" />,
    component: <MemoryGame />,
  },
];

export default function MiniGames() {
  const [activeGame, setActiveGame] = useState(games[0].id);

  const current = games.find(g => g.id === activeGame)!;

  return (
    <section id="games" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <Gamepad2 className="w-4 h-4" />
            Mini Games
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Take a <span className="purple-gradient-text">Break</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Because every developer needs a break from debugging. Play some games!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Game selector */}
          <div className="space-y-3">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  activeGame === game.id
                    ? 'bg-purple-900/30 border-purple-600/50 shadow-lg shadow-purple-900/20'
                    : 'bg-white/5 border-white/10 hover:bg-purple-900/10 hover:border-purple-700/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeGame === game.id
                      ? 'bg-purple-700 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {game.icon}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${activeGame === game.id ? 'text-white' : 'text-gray-300'}`}>
                      {game.title}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">{game.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Game area */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center text-white">
                  {current.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{current.title}</h3>
                  <p className="text-gray-400 text-sm">{current.description}</p>
                </div>
              </div>

              <div className="min-h-[320px] flex items-center justify-center">
                {current.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
