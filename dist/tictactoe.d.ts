type PlayerValue = 'x' | 'o';
type PositionValue = null | PlayerValue;
type PatternPosition = null | true;
type CoordValue = 0 | 1 | 2;
type Coord = [CoordValue, CoordValue];
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
export {};
