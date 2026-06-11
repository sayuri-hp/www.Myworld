import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

type Cell = 'X' | 'O' | null;

const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Cell[]): { winner: Cell; line: number[] } | null {
  for (const line of winLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const result = checkWinner(board);
  const isFull = board.every(Boolean);
  const isDraw = !result && isFull;

  const handleClick = (index: number) => {
    if (board[index] || result || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const newResult = checkWinner(newBoard);
    const newFull = newBoard.every(Boolean);

    if (newResult) {
      setScore(s => ({ ...s, [newResult.winner as 'X' | 'O']: s[newResult.winner as 'X' | 'O'] + 1 }));
    } else if (!newResult && newFull) {
      setScore(s => ({ ...s, draws: s.draws + 1 }));
    }

    setIsXTurn(!isXTurn);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const fullReset = () => {
    reset();
    setScore({ X: 0, O: 0, draws: 0 });
  };

  const winLine = result?.line ?? [];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Score */}
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-black text-purple-400">{score.X}</div>
          <div className="text-xs text-gray-500">Player X</div>
        </div>
        <div>
          <div className="text-2xl font-black text-gray-400">{score.draws}</div>
          <div className="text-xs text-gray-500">Draws</div>
        </div>
        <div>
          <div className="text-2xl font-black text-fuchsia-400">{score.O}</div>
          <div className="text-xs text-gray-500">Player O</div>
        </div>
      </div>

      {/* Status */}
      <div className="h-8 flex items-center">
        {result ? (
          <div className={`font-bold text-lg ${result.winner === 'X' ? 'text-purple-400' : 'text-fuchsia-400'}`}>
            Player {result.winner} wins! 🎉
          </div>
        ) : isDraw ? (
          <div className="text-yellow-400 font-bold text-lg">It's a draw! 🤝</div>
        ) : (
          <div className="text-gray-400 text-sm">
            <span className={result || isDraw ? '' : isXTurn ? 'text-purple-400 font-bold' : 'text-fuchsia-400 font-bold'}>
              Player {isXTurn ? 'X' : 'O'}
            </span>'s turn
          </div>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 flex items-center justify-center text-3xl font-black rounded-xl transition-all duration-200 border ${
              winLine.includes(i)
                ? 'bg-purple-700/30 border-purple-500 shadow-lg shadow-purple-500/30'
                : cell
                ? 'bg-white/5 border-white/10 cursor-default'
                : 'bg-white/5 border-white/10 hover:bg-purple-900/20 hover:border-purple-600/30 cursor-pointer'
            }`}
          >
            <span className={
              cell === 'X' ? 'text-purple-400' :
              cell === 'O' ? 'text-fuchsia-400' : ''
            }>
              {cell}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        {(result || isDraw) && (
          <button onClick={reset} className="btn-primary px-5 py-2 text-sm">
            Play Again
          </button>
        )}
        <button onClick={fullReset} className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-sm transition-colors px-4 py-2">
          <RefreshCw className="w-4 h-4" /> Reset All
        </button>
      </div>
    </div>
  );
}
