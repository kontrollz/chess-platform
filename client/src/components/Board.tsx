import Square from "./Square";
import type { ChessJSPiece } from "../types/chess";


type BoardProps = {
    board: (ChessJSPiece | null)[][];
    selected: [number, number] | null;
    onSquareClick: (row: number, col: number) => void;
};

export default function Board({
    board,
    selected, 
    onSquareClick,
}: BoardProps) {
    return (
        <div className="grid grid-cols-8 border">
            {board.map((row, r) => 
                row.map((piece, c) => {
                    const isSelected = 
                        selected?.[0] === r && selected?.[1] === c;

                    // create a new square for each row/col
                    return (
                        <Square
                            key={`${r}-${c}`}
                            piece={piece}
                            isSelected={isSelected}
                            onClick={() => onSquareClick(r,c)}
                        />
                    );
                })
            )}
        </div>
    );
}



