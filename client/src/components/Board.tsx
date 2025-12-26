import Square from "./Square";
import type { ChessJSPiece } from "../types/chess";


type BoardProps = {
    board: (ChessJSPiece | null)[][];
    selected: [number, number] | null;
    onSquareClick: (row: number, col: number) => void;
    legalMoves: Set<string>
};

export default function Board({
    board,
    selected, 
    onSquareClick,
    legalMoves,
}: BoardProps) {
    const files = 'abcdefgh';
    return (
        <div className="grid grid-cols-8 border">
            {board.map((row, r) => 
                row.map((piece, c) => {                    
                    const square = files[c] + (8-r);
                    const isLegalMove = legalMoves.has(square);

                    const isSelected = 
                        selected?.[0] === r && selected?.[1] === c;

                    // create a new square for each row/col
                    return (
                        <Square
                            key={`${r}-${c}`}
                            piece={piece}
                            isSelected={isSelected}
                            onClick={() => onSquareClick(r,c)}
                            isLegalMove={isLegalMove}
                        />
                    );
                })
            )}
        </div>
    );
}



