import { useState } from "react";
import Board from "./components/Board";
import { Chess } from "chess.js";
import type { Square } from "chess.js";
import type { ChessJSPiece } from "./types/chess";

/* ---------------- TYPES ---------------- */

type Piece = ChessJSPiece | null;
type Board = Piece[][];


/* ---------------- APP ---------------- */

export default function App() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<Set<string>>(new Set());

  const board = game.board();
  const turn = game.turn() === "w" ? "White" : "Black";

  function handleSquareClick(row: number, col: number) {
    if (winner) return;

    if (!selected) {
      const piece = board[row][col];
      if (!piece) return; // do nothing when you click an empty square

      if (piece.color !== game.turn()) return; // do nothing when wrong colored piece is clicked

      const from = toSquare([row, col]) as Square;

      // generate legal moves from current square
      const moves = game.moves({square: from, verbose: true});

      const targets = new Set(moves.map(m => m.to));

      // set selected and legal targets
      setSelected([row, col]);
      setLegalMoves(targets);



    } else {
      // same square
      const from = toSquare(selected);
      const to = toSquare([row, col]);

      if (from === to) {
        setSelected(null);
        setLegalMoves(new Set());
        return;
      }
      
      
      // another own piece
      const newSelectedPiece = board[row][col];
      
      if (newSelectedPiece && newSelectedPiece.color === game.turn()) {
        const newFrom = toSquare([row, col]) as Square;
        const moves = game.moves({square: newFrom, verbose: true});
        const targets = new Set(moves.map(m => m.to));

        setSelected([row, col]);
        setLegalMoves(targets);
        return;
      }
      
      // invalid move
      if (!legalMoves.has(to)) {
        setSelected(null);
        setLegalMoves(new Set());
        return;
      }

      // make move
      const newGame = new Chess(game.fen());
      newGame.move({from, to});

      setGame(newGame);
      setSelected(null);
      setLegalMoves(new Set());

      if (newGame.isGameOver()) {
        setWinner( newGame.isCheckmate()
          ? `${newGame.turn() === 'b' ? "White" : "Black"} wins!`
          : "Draw.");
        }
    } 
    
  }

  function toSquare([row, col]: [number, number]): string {
    const files = "abcdefgh";
    return files[col] + (8 - row);
  }

  // e4 -> [4, 3]
  function toRowCol(square: string): [number, number] {
    const files = "abcdefgh";
    const col = files.indexOf(square[0]);
    const row = 8 - Number(square[1]);

    return [row, col];
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Chess Platform</h1>

      <Board
        board={board}
        selected={selected}
        onSquareClick={handleSquareClick}
        legalMoves={legalMoves}
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
