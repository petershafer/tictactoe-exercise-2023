export type Coordinates = [number, number];
export interface GridDescription {
  rows: number;
  columns: number;
}
export interface Grid {
  setPosition: (position: Coordinates, value: any) => void;
  getPosition: (position: Coordinates) => any;
  setIndex: (index: number, value: any) => void;
  getIndex: (index: number) => any;
  getRow: (row: number) => any[];
  setRow: (row: number, values: any[]) => void;
  getRows: () => any[][];
  getColumn: (column: number) => any[];
  setColumn: (column: number, values: any[]) => void;
  getColumns: () => any[][];
  fill: (value: any[]) => void;
  info: () => GridDescription;
  exportGrid: () => any[][];
  importGrid: (values: any[][]) => void;
  exportValues: () => any[][];
  importValues: (values: any[][]) => void;
}

class grid implements Grid {
  #values: any[] = Array();
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
  }

  setPosition(position: Coordinates, value: any) {
    const [row, column] = position;
    if (typeof row !== 'number' || typeof column !== 'number') {
      throw new Error(`Invalid grid position`);
    }
    if (
      (row && (row < 1 || row >= this.#rows)) ||
      (column && (column < 1 || column >= this.#columns))
    ) {
      throw new Error(`Invalid grid position`);
    }
    this.#values[row * this.#rows + column] = value;
  }

  getPosition(position: Coordinates) {
    const [row, column] = position;
    if (typeof row !== 'number' || typeof column !== 'number') {
      throw new Error(`Invalid grid position`);
    }
    if (
      (row && (row < 1 || row >= this.#rows)) ||
      (column && (column < 1 || column >= this.#columns))
    ) {
      throw new Error(`Invalid grid position`);
    }
    return this.#values[row * this.#rows + column];
  }

  getRow(row: number) {
    if (typeof row !== 'number') {
      throw new Error(`Invalid grid row`);
    }
    if (row < 1 || row >= this.#rows) {
      throw new Error(`Invalid grid row`);
    }
    const start = row * this.#columns;
    return this.#values.slice(start, this.#columns);
  }

  setRow(row: number, values: any[]) {
    if (typeof row !== 'number') {
      throw new Error(`Invalid grid row`);
    }
    if (row < 1 || row >= this.#rows) {
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
      throw new Error(`Invalid grid row`);
    }
    if (column < 1 || column >= this.#columns) {
      throw new Error(`Invalid grid row`);
    }
    const columnVals = [];
    for (let i = 0; i < this.#rows; i++) {
      columnVals[i] = this.#values[i * this.#columns + column];
    }
    return columnVals;
  }

  setColumn(column: number, values: any[]) {
    if (typeof column !== 'number') {
      throw new Error(`Invalid grid column`);
    }
    if (column < 1 || column >= this.#columns) {
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
  }

  getColumns() {
    const columns = [];
    for (let i = 0; i < this.#columns; i++) {
      columns[i] = this.getColumn(i);
    }
    return columns;
  }

  setIndex(index: number, value: any) {
    if (typeof index !== 'number') {
      throw new Error(`Invalid grid index`);
    }
    if (index < 1 || index >= this.#rows * this.#columns) {
      throw new Error(`Invalid grid index`);
    }
    this.#values[index] = value;
  }

  getIndex(index: number) {
    if (typeof index !== 'number') {
      throw new Error(`Invalid grid index`);
    }
    if (index < 1 || index >= this.#rows * this.#columns) {
      throw new Error(`Invalid grid index`);
    }
    return this.#values[index];
  }

  fill(value: any) {
    for (let i = 0; i < this.#values.length; i++) {
      this.#values[i] = value;
    }
  }

  info() {
    return {
      rows: this.#rows,
      columns: this.#columns,
    };
  }

  exportGrid() {
    const grid: any[] = [];
    for (let i = 0; i < this.#rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.#columns; j++) {
        grid[i][j] = this.#values[i * this.#rows + j];
      }
    }
    return grid;
  }

  importGrid(values: any[][]) {
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

  importValues(values: any[][]) {
    if (!Array.isArray(values)) {
      throw new Error(`Invalid grid value`);
    }
    if (values.length !== this.#values.length) {
      throw new Error(`Invalid grid value`);
    }
    this.#values = [...this.#values];
  }
}

class Grid3x3 extends grid {
  constructor() {
    super(3, 3);
  }
}

module.exports = {
  Grid3x3,
};
