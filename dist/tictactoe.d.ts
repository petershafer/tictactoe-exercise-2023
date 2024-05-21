import { Grid3x3 } from './grid';
export type PlayerValue = 'x' | 'o';
export type PositionValue = null | PlayerValue;
export type PatternPosition = null | true;
export type CoordValue = 0 | 1 | 2;
export type Coord = [CoordValue, CoordValue];
export interface TTTObject {
    nextMove: (player: PlayerValue, position: Coord) => void;
    isOver: () => boolean;
    getBoard: () => PositionValue[][];
    printBoard: () => void;
    winner: () => PlayerValue | null;
    lastPlayer: () => PlayerValue | null;
    winPattern: () => PatternPosition[] | null;
    export: () => GameExport;
}
export interface GameExport {
    winner: PlayerValue | null;
    firstPlayer: PlayerValue | null;
    board: PositionValue[][];
    history: (PlayerValue | Coord)[];
}
export declare const newGame: () => TTTObject;
export declare const unit: {
    doMove: (player: PlayerValue, position: Coord, board: Grid3x3<PositionValue>) => Grid3x3<PositionValue>;
    printBoard: (board: Grid3x3<any>) => void;
    isWinningBoard: (gameBoard: Grid3x3<PositionValue>, player: PlayerValue) => {
        complete: boolean;
        winner: PlayerValue;
        winPattern: PatternPosition[] | null;
    };
    matchingBoards: (gameBoard: Grid3x3<PatternPosition>) => (patternBoard: Grid3x3<PatternPosition>) => boolean;
    normalizeBoardForPlayer: (board: Grid3x3<PositionValue>, player: PlayerValue) => Grid3x3<PatternPosition>;
    validateBoard: (board: Grid3x3<PositionValue> | Grid3x3<PatternPosition>) => void;
    winningBoards: Grid3x3<PatternPosition>[];
    newBoard: () => Grid3x3<PositionValue>;
};
