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
  contains: (
    other: Grid<unknown>,
    comparator?: (otherValue: unknown, containerValue: unknown) => boolean
  ) => boolean;
  reset: () => Grid<T>;
}

export class Grid<T> implements GridType<T> {
  #values: T[];
  #rows: number;
  #columns: number;

  constructor(rows: number, columns: number) {
    if (typeof rows !== 'number' || typeof columns !== 'number') {
      throw new Error(`Invalid grid dimensions`);
    }
    if ((rows && rows < 1) || (columns && columns < 1)) {
      throw new Error(`Invalid grid dimensions`);
    }
    this.#rows = rows;
    this.#columns = columns;
    this.#values = Array(rows * columns);
  }

  setPosition(position: Coordinates, value: T) {
    const [row, column] = position;
    if (typeof row !== 'number' || typeof column !== 'number') {
      throw new Error(`Invalid grid position`);
    }
    if (
      (row && (row < 0 || row >= this.#rows)) ||
      (column && (column < 0 || column >= this.#columns))
    ) {
      throw new Error(`Invalid grid position`);
    }
    this.#values[row * this.#rows + column] = value;
    return this;
  }

  getPosition(position: Coordinates) {
    const [row, column] = position;
    if (typeof row !== 'number' || typeof column !== 'number') {
      throw new Error(`Invalid grid position`);
    }
    if (
      (row && (row < 0 || row >= this.#rows)) ||
      (column && (column < 0 || column >= this.#columns))
    ) {
      throw new Error(`Invalid grid position`);
    }
    return this.#values[row * this.#rows + column];
  }

  getRow(row: number) {
    if (typeof row !== 'number') {
      throw new Error(`Invalid grid row`);
    }
    if (row < 0 || row >= this.#rows) {
      throw new Error(`Invalid grid row`);
    }
    const start = row * this.#columns;
    return this.#values.slice(start, start + this.#columns);
  }

  setRow(row: number, values: T[]) {
    if (typeof row !== 'number') {
      throw new Error(`Invalid grid row`);
    }
    if (row < 0 || row >= this.#rows) {
      throw new Error(`Invalid grid row`);
    }
    if (!Array.isArray(values)) {
      throw new Error(`Invalid row values`);
    }
    if (values.length !== this.#columns) {
      throw new Error(`Invalid row values`);
    }
    const start = row * this.#columns;
    this.#values.splice(start, this.#columns, ...values);
    return this;
  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.#rows; i++) {
      rows[i] = this.getRow(i);
    }
    return rows;
  }

  getColumn(column: number) {
    if (typeof column !== 'number') {
      throw new Error(`Invalid grid column`);
    }
    if (column < 0 || column >= this.#columns) {
      throw new Error(`Invalid grid column`);
    }
    const columnVals = [];
    for (let i = 0; i < this.#rows; i++) {
      columnVals[i] = this.#values[i * this.#columns + column];
    }
    return columnVals;
  }

  setColumn(column: number, values: T[]) {
    if (typeof column !== 'number') {
      throw new Error(`Invalid grid column`);
    }
    if (column < 0 || column >= this.#columns) {
      throw new Error(`Invalid grid column`);
    }
    if (!Array.isArray(values)) {
      throw new Error(`Invalid column values`);
    }
    if (values.length !== this.#rows) {
      throw new Error(`Invalid column values`);
    }
    for (let i = 0; i < this.#rows; i++) {
      this.#values[i * this.#columns + column] = values[i];
    }
    return this;
  }

  getColumns() {
    const columns = [];
    for (let i = 0; i < this.#columns; i++) {
      columns[i] = this.getColumn(i);
    }
    return columns;
  }

  setIndex(index: number, value: T) {
    if (typeof index !== 'number') {
      throw new Error(`Invalid grid index`);
    }
    if (index < 0 || index >= this.#rows * this.#columns) {
      throw new Error(`Invalid grid index`);
    }
    this.#values[index] = value;
    return this;
  }

  getIndex(index: number) {
    if (typeof index !== 'number') {
      throw new Error(`Invalid grid index`);
    }
    if (index < 0 || index >= this.#rows * this.#columns) {
      throw new Error(`Invalid grid index`);
    }
    return this.#values[index];
  }

  fill(value: T) {
    for (let i = 0; i < this.#values.length; i++) {
      this.#values[i] = value;
    }
    return this;
  }

  info() {
    return {
      rows: this.#rows,
      columns: this.#columns,
    };
  }

  exportGrid() {
    const grid: T[][] = [];
    for (let i = 0; i < this.#rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.#columns; j++) {
        grid[i][j] = this.#values[i * this.#rows + j];
      }
    }
    return grid;
  }

  importGrid(values: T[][]) {
    if (!Array.isArray(values)) {
      throw new Error(`Invalid grid value`);
    }
    if (values.length !== this.#rows) {
      throw new Error(`Invalid grid value`);
    }
    values.forEach((row, i) => this.setRow(i, row));
  }

  exportValues() {
    return [...this.#values];
  }

  importValues(values: T[]) {
    if (!Array.isArray(values)) {
      throw new Error(`Invalid grid value`);
    }
    if (values.length !== this.#values.length) {
      throw new Error(`Invalid grid value`);
    }
    this.#values = [...values];
  }

  map(fn: (value: T, position: Coordinates) => T) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#columns; j++) {
        this.setPosition([i, j], fn(this.getPosition([i, j]), [i, j]));
      }
    }
    return this;
  }

  forEach(fn: (value: T, position: Coordinates) => void) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#columns; j++) {
        fn(this.getPosition([i, j]), [i, j]);
      }
    }
  }

  duplicate() {
    const newGrid = new Grid<T>(this.#rows, this.#columns);
    newGrid.importValues(this.exportValues());
    return newGrid;
  }

  contains(
    other: Grid<unknown>,
    comparator?: (otherValue: unknown, containerValue: unknown) => boolean
  ) {
    let contains = true;
    other.forEach((value, [row, column]) => {
      if (comparator) {
        contains =
          contains && comparator(value, this.getPosition([row, column]));
      } else if (value !== undefined) {
        contains = contains && value === this.getPosition([row, column]);
      }
    });
    return contains;
  }

  reset() {
    this.#values = Array(this.#rows * this.#columns);
    return this;
  }
}

export class Grid3x3<T> extends Grid<T> {
  constructor() {
    super(3, 3);
  }
}
