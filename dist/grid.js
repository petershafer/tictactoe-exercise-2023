"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Grid_values, _Grid_rows, _Grid_columns;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid3x3 = exports.Grid = void 0;
class Grid {
    constructor(rows, columns) {
        _Grid_values.set(this, void 0);
        _Grid_rows.set(this, void 0);
        _Grid_columns.set(this, void 0);
        if (typeof rows !== 'number' || typeof columns !== 'number') {
            throw new Error(`Invalid grid dimensions`);
        }
        if ((rows && rows < 1) || (columns && columns < 1)) {
            throw new Error(`Invalid grid dimensions`);
        }
        __classPrivateFieldSet(this, _Grid_rows, rows, "f");
        __classPrivateFieldSet(this, _Grid_columns, columns, "f");
        __classPrivateFieldSet(this, _Grid_values, Array(rows * columns), "f");
    }
    setPosition(position, value) {
        const [row, column] = position;
        if (typeof row !== 'number' || typeof column !== 'number') {
            throw new Error(`Invalid grid position`);
        }
        if ((row && (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, "f"))) ||
            (column && (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, "f")))) {
            throw new Error(`Invalid grid position`);
        }
        __classPrivateFieldGet(this, _Grid_values, "f")[row * __classPrivateFieldGet(this, _Grid_rows, "f") + column] = value;
        return this;
    }
    getPosition(position) {
        const [row, column] = position;
        if (typeof row !== 'number' || typeof column !== 'number') {
            throw new Error(`Invalid grid position`);
        }
        if ((row && (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, "f"))) ||
            (column && (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, "f")))) {
            throw new Error(`Invalid grid position`);
        }
        return __classPrivateFieldGet(this, _Grid_values, "f")[row * __classPrivateFieldGet(this, _Grid_rows, "f") + column];
    }
    getRow(row) {
        if (typeof row !== 'number') {
            throw new Error(`Invalid grid row`);
        }
        if (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, "f")) {
            throw new Error(`Invalid grid row`);
        }
        const start = row * __classPrivateFieldGet(this, _Grid_columns, "f");
        return __classPrivateFieldGet(this, _Grid_values, "f").slice(start, start + __classPrivateFieldGet(this, _Grid_columns, "f"));
    }
    setRow(row, values) {
        if (typeof row !== 'number') {
            throw new Error(`Invalid grid row`);
        }
        if (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, "f")) {
            throw new Error(`Invalid grid row`);
        }
        if (!Array.isArray(values)) {
            throw new Error(`Invalid row values`);
        }
        if (values.length !== __classPrivateFieldGet(this, _Grid_columns, "f")) {
            throw new Error(`Invalid row values`);
        }
        const start = row * __classPrivateFieldGet(this, _Grid_columns, "f");
        __classPrivateFieldGet(this, _Grid_values, "f").splice(start, __classPrivateFieldGet(this, _Grid_columns, "f"), ...values);
        return this;
    }
    getRows() {
        const rows = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            rows[i] = this.getRow(i);
        }
        return rows;
    }
    getColumn(column) {
        if (typeof column !== 'number') {
            throw new Error(`Invalid grid column`);
        }
        if (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, "f")) {
            throw new Error(`Invalid grid column`);
        }
        const columnVals = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            columnVals[i] = __classPrivateFieldGet(this, _Grid_values, "f")[i * __classPrivateFieldGet(this, _Grid_columns, "f") + column];
        }
        return columnVals;
    }
    setColumn(column, values) {
        if (typeof column !== 'number') {
            throw new Error(`Invalid grid column`);
        }
        if (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, "f")) {
            throw new Error(`Invalid grid column`);
        }
        if (!Array.isArray(values)) {
            throw new Error(`Invalid column values`);
        }
        if (values.length !== __classPrivateFieldGet(this, _Grid_rows, "f")) {
            throw new Error(`Invalid column values`);
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            __classPrivateFieldGet(this, _Grid_values, "f")[i * __classPrivateFieldGet(this, _Grid_columns, "f") + column] = values[i];
        }
        return this;
    }
    getColumns() {
        const columns = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_columns, "f"); i++) {
            columns[i] = this.getColumn(i);
        }
        return columns;
    }
    setIndex(index, value) {
        if (typeof index !== 'number') {
            throw new Error(`Invalid grid index`);
        }
        if (index < 0 || index >= __classPrivateFieldGet(this, _Grid_rows, "f") * __classPrivateFieldGet(this, _Grid_columns, "f")) {
            throw new Error(`Invalid grid index`);
        }
        __classPrivateFieldGet(this, _Grid_values, "f")[index] = value;
        return this;
    }
    getIndex(index) {
        if (typeof index !== 'number') {
            throw new Error(`Invalid grid index`);
        }
        if (index < 0 || index >= __classPrivateFieldGet(this, _Grid_rows, "f") * __classPrivateFieldGet(this, _Grid_columns, "f")) {
            throw new Error(`Invalid grid index`);
        }
        return __classPrivateFieldGet(this, _Grid_values, "f")[index];
    }
    fill(value) {
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_values, "f").length; i++) {
            __classPrivateFieldGet(this, _Grid_values, "f")[i] = value;
        }
        return this;
    }
    info() {
        return {
            rows: __classPrivateFieldGet(this, _Grid_rows, "f"),
            columns: __classPrivateFieldGet(this, _Grid_columns, "f"),
        };
    }
    exportGrid() {
        const grid = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            grid[i] = [];
            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, "f"); j++) {
                grid[i][j] = __classPrivateFieldGet(this, _Grid_values, "f")[i * __classPrivateFieldGet(this, _Grid_rows, "f") + j];
            }
        }
        return grid;
    }
    importGrid(values) {
        if (!Array.isArray(values)) {
            throw new Error(`Invalid grid value`);
        }
        if (values.length !== __classPrivateFieldGet(this, _Grid_rows, "f")) {
            throw new Error(`Invalid grid value`);
        }
        values.forEach((row, i) => this.setRow(i, row));
    }
    exportValues() {
        return [...__classPrivateFieldGet(this, _Grid_values, "f")];
    }
    importValues(values) {
        if (!Array.isArray(values)) {
            throw new Error(`Invalid grid value`);
        }
        if (values.length !== __classPrivateFieldGet(this, _Grid_values, "f").length) {
            throw new Error(`Invalid grid value`);
        }
        __classPrivateFieldSet(this, _Grid_values, [...values], "f");
    }
    map(fn) {
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, "f"); j++) {
                this.setPosition([i, j], fn(this.getPosition([i, j]), [i, j]));
            }
        }
        return this;
    }
    forEach(fn) {
        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, "f"); i++) {
            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, "f"); j++) {
                fn(this.getPosition([i, j]), [i, j]);
            }
        }
    }
    duplicate() {
        const newGrid = new Grid(__classPrivateFieldGet(this, _Grid_rows, "f"), __classPrivateFieldGet(this, _Grid_columns, "f"));
        newGrid.importValues(this.exportValues());
        return newGrid;
    }
    contains(other, comparator) {
        let contains = true;
        other.forEach((value, [row, column]) => {
            if (comparator) {
                contains =
                    contains && comparator(value, this.getPosition([row, column]));
            }
            else if (value !== undefined) {
                contains = contains && value === this.getPosition([row, column]);
            }
        });
        return contains;
    }
    reset() {
        __classPrivateFieldSet(this, _Grid_values, Array(__classPrivateFieldGet(this, _Grid_rows, "f") * __classPrivateFieldGet(this, _Grid_columns, "f")), "f");
        return this;
    }
}
exports.Grid = Grid;
_Grid_values = new WeakMap(), _Grid_rows = new WeakMap(), _Grid_columns = new WeakMap();
class Grid3x3 extends Grid {
    constructor() {
        super(3, 3);
    }
}
exports.Grid3x3 = Grid3x3;
//# sourceMappingURL=grid.js.map