import { useState } from "react";
import Board from "./components/Board";
import { Chess } from "chess.js";
import type { ChessJSPiece } from "./types/chess";

/* ---------------- TYPES ---------------- */

type Piece = ChessJSPiece | null;
type Board = Piece[][];


/* ---------------- APP ---------------- */

export default function App() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const board = game.board();
  const turn = game.turn() === "w" ? "White" : "Black";

  function handleSquareClick(row: number, col: number) {
    if (winner) return;

    if (!selected) {
      if (board[row][col]) {
        setSelected([row, col]);
      }
    } else {
      const from = toSquare(selected);
      const to = toSquare([row, col]);

      const newGame = new Chess(game.fen());

      try {
      const move = newGame.move({ from, to });
      
      
      if (move) {
        setGame(newGame);
        setSelected(null);

        if (newGame.isGameOver()) {
            setWinner(
                newGame.isCheckmate()
                ? `${newGame.turn() === 'w' ? "Black" : "White"} wins`
                : "Draw"
            );
        }
      }
    } catch (e) {
      // illegal move
      console.error(e);
      setSelected(null);
    } 
    }
  }

  function toSquare([row, col]: [number, number]) {
    const files = "abcdefgh";
    return files[col] + (8 - row);
  }



  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Chess Platform</h1>

      <Board
        board={board}
        selected={selected}
        onSquareClick={handleSquareClick}
       />

      <p>Turn: {turn}</p>

      {winner && (
        <div className="text-xl font-bold text-red-600">
          {winner}
        </div>
      )}
    </div>
  );
}
