import type { ChessJSPiece } from "../types/chess";

type SquareProps = {
    piece: ChessJSPiece | null;
    isSelected: boolean;
    onClick: () => void;
    isLegalMove: boolean;
};

function renderPiece(piece: ChessJSPiece | null) {
    if (!piece) return;

    const symbols: Record<string, string> = {
        pw: "♙", pb: "♟",
        rw: "♖", rb: "♜",
        nw: "♘", nb: "♞",
        bw: "♗", bb: "♝",
        qw: "♕", qb: "♛",
        kw: "♔", kb: "♚",    
    }

    return symbols[piece.type + piece.color];

}



export default function Square({
    piece,
    isSelected,
    onClick,
    isLegalMove,
}: SquareProps) {

    // return a single square
    return (
        <div
            onClick={onClick}
            className={`w-12 h-12 flex items-center justify-center border cursor-pointer
                    ${isSelected
                        ? "bg-yellow-300" 
                        : isLegalMove
                        ? "bg-green-300"
                        : "bg-white"
                    }
                `}
        >
            {renderPiece(piece)}
        </div>
    );


}