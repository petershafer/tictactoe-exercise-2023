export type Coordinates = [number, number];
export interface GridDescription {
    rows: number;
    columns: number;
}
interface GridType<T> {
    setPosition: (position: Coordinates, value: T) => Grid<T>;
    getPosition: (position: Coordinates) => T;
    setIndex: (index: number, value: T) => Grid<T>;
    getIndex: (index: number) => T;
    getRow: (row: number) => T[];
    setRow: (row: number, values: T[]) => Grid<T>;
    getRows: () => T[][];
    getColumn: (column: number) => T[];
    setColumn: (column: number, values: T[]) => Grid<T>;
    getColumns: () => T[][];
    fill: (value: T) => Grid<T>;
    info: () => GridDescription;
    exportGrid: () => T[][];
    importGrid: (values: T[][]) => void;
    exportValues: () => T[];
    importValues: (values: T[]) => void;
    map: (fn: (value: T, position: Coordinates) => T) => Grid<T>;
    forEach: (fn: (value: T, position: Coordinates) => void) => void;
    duplicate: () => Grid<T>;
    contains: (other: Grid<unknown>, comparator?: (containerValue: unknown, otherValue: unknown) => boolean) => boolean;
    reset: () => Grid<T>;
}
export declare class Grid<T> implements GridType<T> {
    #private;
    constructor(rows: number, columns: number);
    setPosition(position: Coordinates, value: T): this;
    getPosition(position: Coordinates): T;
    getRow(row: number): T[];
    setRow(row: number, values: T[]): this;
    getRows(): T[][];
    getColumn(column: number): T[];
    setColumn(column: number, values: T[]): this;
    getColumns(): T[][];
    setIndex(index: number, value: T): this;
    getIndex(index: number): T;
    fill(value: T): this;
    info(): {
        rows: number;
        columns: number;
    };
    exportGrid(): T[][];
    importGrid(values: T[][]): void;
    exportValues(): T[];
    importValues(values: T[]): void;
    map(fn: (value: T, position: Coordinates) => T): this;
    forEach(fn: (value: T, position: Coordinates) => void): void;
    duplicate(): Grid<T>;
    contains(other: Grid<unknown>, comparator?: (containerValue: unknown, otherValue: unknown) => boolean): boolean;
    reset(): this;
}
export declare class Grid3x3<T> extends Grid<T> {
    constructor();
}
export {};
