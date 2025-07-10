import React, { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button
      className="w-16 h-16 border-2 border-black text-2xl font-bold flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [start, setStart] = useState(false);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const currentPlayer = xIsNext ? "X" : "O";
  const currentName = xIsNext ? playerX : playerO;

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);

    const win = calculateWinner(nextSquares);
    if (win) {
      setWinner(win);
      setScore((prev) => ({ ...prev, [win]: prev[win] + 1 }));
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const handleStart = () => {
    if (!playerX || !playerO) {
      alert("Enter Two Player Name.");
      return;
    }
    setStart(true);
  };

  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-white">
      <div className="p-8 bg-gradient-to-t from-sky-500 to-indigo-500 rounded-xl shadow-md w-[350px]">
        {!start ? (
          <div className="space-y-4 text-white">
            <h2 className="text-2xl font-bold text-center">Tic Tac Toe</h2>
            <input
              type="text"
              placeholder="Player Name X"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              className="p-2 rounded w-full text-black border-3 border-white"
            />
            <input
              type="text"
              placeholder="Player Name O"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              className="p-2 rounded w-full text-black border-3 border-white"
            />
            <button
              onClick={handleStart}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="text-white text-center mb-4">
              <h2 className="text-xl font-semibold">
                {winner
                  ? `Winner: ${winner === "X" ? playerX : playerO}`
                  : `Turn: ${currentName}`}
              </h2>
              <p className="mt-2 text-sm">
                Score {playerX} (X): {score.X} | {playerO} (O): {score.O}
              </p>
            </div>
            <Board squares={squares} onSquareClick={handleClick} />
            <button
              onClick={handlePlayAgain}
              className="mt-6 w-full bg-white text-black px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
