/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/grid.ts":
/*!*********************!*\
  !*** ./src/grid.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {\n    if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n    return (kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\n};\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\nvar _Grid_values, _Grid_rows, _Grid_columns;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Grid3x3 = exports.Grid = void 0;\nclass Grid {\n    constructor(rows, columns) {\n        _Grid_values.set(this, void 0);\n        _Grid_rows.set(this, void 0);\n        _Grid_columns.set(this, void 0);\n        if (typeof rows !== 'number' || typeof columns !== 'number') {\n            throw new Error(`Invalid grid dimensions`);\n        }\n        if ((rows && rows < 1) || (columns && columns < 1)) {\n            throw new Error(`Invalid grid dimensions`);\n        }\n        __classPrivateFieldSet(this, _Grid_rows, rows, \"f\");\n        __classPrivateFieldSet(this, _Grid_columns, columns, \"f\");\n        __classPrivateFieldSet(this, _Grid_values, Array(rows * columns), \"f\");\n    }\n    setPosition(position, value) {\n        const [row, column] = position;\n        if (typeof row !== 'number' || typeof column !== 'number') {\n            throw new Error(`Invalid grid position`);\n        }\n        if ((row && (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, \"f\"))) ||\n            (column && (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, \"f\")))) {\n            throw new Error(`Invalid grid position`);\n        }\n        __classPrivateFieldGet(this, _Grid_values, \"f\")[row * __classPrivateFieldGet(this, _Grid_rows, \"f\") + column] = value;\n        return this;\n    }\n    getPosition(position) {\n        const [row, column] = position;\n        if (typeof row !== 'number' || typeof column !== 'number') {\n            throw new Error(`Invalid grid position`);\n        }\n        if ((row && (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, \"f\"))) ||\n            (column && (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, \"f\")))) {\n            throw new Error(`Invalid grid position`);\n        }\n        return __classPrivateFieldGet(this, _Grid_values, \"f\")[row * __classPrivateFieldGet(this, _Grid_rows, \"f\") + column];\n    }\n    getRow(row) {\n        if (typeof row !== 'number') {\n            throw new Error(`Invalid grid row`);\n        }\n        if (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, \"f\")) {\n            throw new Error(`Invalid grid row`);\n        }\n        const start = row * __classPrivateFieldGet(this, _Grid_columns, \"f\");\n        return __classPrivateFieldGet(this, _Grid_values, \"f\").slice(start, start + __classPrivateFieldGet(this, _Grid_columns, \"f\"));\n    }\n    setRow(row, values) {\n        if (typeof row !== 'number') {\n            throw new Error(`Invalid grid row`);\n        }\n        if (row < 0 || row >= __classPrivateFieldGet(this, _Grid_rows, \"f\")) {\n            throw new Error(`Invalid grid row`);\n        }\n        if (!Array.isArray(values)) {\n            throw new Error(`Invalid row values`);\n        }\n        if (values.length !== __classPrivateFieldGet(this, _Grid_columns, \"f\")) {\n            throw new Error(`Invalid row values`);\n        }\n        const start = row * __classPrivateFieldGet(this, _Grid_columns, \"f\");\n        __classPrivateFieldGet(this, _Grid_values, \"f\").splice(start, __classPrivateFieldGet(this, _Grid_columns, \"f\"), ...values);\n        return this;\n    }\n    getRows() {\n        const rows = [];\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            rows[i] = this.getRow(i);\n        }\n        return rows;\n    }\n    getColumn(column) {\n        if (typeof column !== 'number') {\n            throw new Error(`Invalid grid column`);\n        }\n        if (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, \"f\")) {\n            throw new Error(`Invalid grid column`);\n        }\n        const columnVals = [];\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            columnVals[i] = __classPrivateFieldGet(this, _Grid_values, \"f\")[i * __classPrivateFieldGet(this, _Grid_columns, \"f\") + column];\n        }\n        return columnVals;\n    }\n    setColumn(column, values) {\n        if (typeof column !== 'number') {\n            throw new Error(`Invalid grid column`);\n        }\n        if (column < 0 || column >= __classPrivateFieldGet(this, _Grid_columns, \"f\")) {\n            throw new Error(`Invalid grid column`);\n        }\n        if (!Array.isArray(values)) {\n            throw new Error(`Invalid column values`);\n        }\n        if (values.length !== __classPrivateFieldGet(this, _Grid_rows, \"f\")) {\n            throw new Error(`Invalid column values`);\n        }\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            __classPrivateFieldGet(this, _Grid_values, \"f\")[i * __classPrivateFieldGet(this, _Grid_columns, \"f\") + column] = values[i];\n        }\n        return this;\n    }\n    getColumns() {\n        const columns = [];\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_columns, \"f\"); i++) {\n            columns[i] = this.getColumn(i);\n        }\n        return columns;\n    }\n    setIndex(index, value) {\n        if (typeof index !== 'number') {\n            throw new Error(`Invalid grid index`);\n        }\n        if (index < 0 || index >= __classPrivateFieldGet(this, _Grid_rows, \"f\") * __classPrivateFieldGet(this, _Grid_columns, \"f\")) {\n            throw new Error(`Invalid grid index`);\n        }\n        __classPrivateFieldGet(this, _Grid_values, \"f\")[index] = value;\n        return this;\n    }\n    getIndex(index) {\n        if (typeof index !== 'number') {\n            throw new Error(`Invalid grid index`);\n        }\n        if (index < 0 || index >= __classPrivateFieldGet(this, _Grid_rows, \"f\") * __classPrivateFieldGet(this, _Grid_columns, \"f\")) {\n            throw new Error(`Invalid grid index`);\n        }\n        return __classPrivateFieldGet(this, _Grid_values, \"f\")[index];\n    }\n    fill(value) {\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_values, \"f\").length; i++) {\n            __classPrivateFieldGet(this, _Grid_values, \"f\")[i] = value;\n        }\n        return this;\n    }\n    info() {\n        return {\n            rows: __classPrivateFieldGet(this, _Grid_rows, \"f\"),\n            columns: __classPrivateFieldGet(this, _Grid_columns, \"f\"),\n        };\n    }\n    exportGrid() {\n        const grid = [];\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            grid[i] = [];\n            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, \"f\"); j++) {\n                grid[i][j] = __classPrivateFieldGet(this, _Grid_values, \"f\")[i * __classPrivateFieldGet(this, _Grid_rows, \"f\") + j];\n            }\n        }\n        return grid;\n    }\n    importGrid(values) {\n        if (!Array.isArray(values)) {\n            throw new Error(`Invalid grid value`);\n        }\n        if (values.length !== __classPrivateFieldGet(this, _Grid_rows, \"f\")) {\n            throw new Error(`Invalid grid value`);\n        }\n        values.forEach((row, i) => this.setRow(i, row));\n    }\n    exportValues() {\n        return [...__classPrivateFieldGet(this, _Grid_values, \"f\")];\n    }\n    importValues(values) {\n        if (!Array.isArray(values)) {\n            throw new Error(`Invalid grid value`);\n        }\n        if (values.length !== __classPrivateFieldGet(this, _Grid_values, \"f\").length) {\n            throw new Error(`Invalid grid value`);\n        }\n        __classPrivateFieldSet(this, _Grid_values, [...values], \"f\");\n    }\n    map(fn) {\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, \"f\"); j++) {\n                this.setPosition([i, j], fn(this.getPosition([i, j]), [i, j]));\n            }\n        }\n        return this;\n    }\n    forEach(fn) {\n        for (let i = 0; i < __classPrivateFieldGet(this, _Grid_rows, \"f\"); i++) {\n            for (let j = 0; j < __classPrivateFieldGet(this, _Grid_columns, \"f\"); j++) {\n                fn(this.getPosition([i, j]), [i, j]);\n            }\n        }\n    }\n    duplicate() {\n        const newGrid = new Grid(__classPrivateFieldGet(this, _Grid_rows, \"f\"), __classPrivateFieldGet(this, _Grid_columns, \"f\"));\n        newGrid.importValues(this.exportValues());\n        return newGrid;\n    }\n    contains(other, comparator) {\n        let contains = true;\n        other.forEach((value, [row, column]) => {\n            if (comparator) {\n                contains =\n                    contains && comparator(value, this.getPosition([row, column]));\n            }\n            else if (value !== undefined) {\n                contains = contains && value === this.getPosition([row, column]);\n            }\n        });\n        return contains;\n    }\n    reset() {\n        __classPrivateFieldSet(this, _Grid_values, Array(__classPrivateFieldGet(this, _Grid_rows, \"f\") * __classPrivateFieldGet(this, _Grid_columns, \"f\")), \"f\");\n        return this;\n    }\n}\nexports.Grid = Grid;\n_Grid_values = new WeakMap(), _Grid_rows = new WeakMap(), _Grid_columns = new WeakMap();\nclass Grid3x3 extends Grid {\n    constructor() {\n        super(3, 3);\n    }\n}\nexports.Grid3x3 = Grid3x3;\n\n\n//# sourceURL=webpack://tictactoe/./src/grid.ts?");

/***/ }),

/***/ "./src/tictactoe.ts":
/*!**************************!*\
  !*** ./src/tictactoe.ts ***!
  \**************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst grid_1 = __webpack_require__(/*! ./grid */ \"./src/grid.ts\");\n// Generate 2D array that is 3x3 and defaulted to null values.\nconst newBoard = () => new grid_1.Grid3x3().fill(null);\nconst newPatternBoard = () => new grid_1.Grid3x3().fill(null);\nconst winsByRow = () => \n// Generate boards with winning patterns for the given rows.\n[0, 1, 2].map((row) => newPatternBoard().setRow(row, [true, true, true]));\n// Generate boards with winning patterns for the given columns.\nconst winsByColumn = () => [0, 1, 2].map((column) => newPatternBoard().setColumn(column, [true, true, true]));\n// Generate boards with winning diagonal patterns.\nconst winsByDiag = () => [\n    // index represents row, value represents position held by player.\n    newPatternBoard().map((_, [row, col]) => (row === col ? true : null)),\n    newPatternBoard().map((_, [row, col]) => (2 - row === col ? true : null)),\n];\n// Aggregation of all winning boards.\n// NOTE: A winning board represents the minimum positions a player must hold\n// for the pattern to create a winning board. Player may hold additional positions.\nconst winningBoards = [...winsByRow(), ...winsByColumn(), ...winsByDiag()];\n// Check shape and values of board for validity.\nconst validateBoard = (board) => {\n    if (!board || !(board instanceof grid_1.Grid3x3)) {\n        throw new Error(`Invalid board`);\n    }\n    let valid = true;\n    board.forEach((cell) => {\n        valid =\n            valid && (cell === 'x' || cell === 'o' || cell === null || cell === true);\n    });\n    if (!valid) {\n        throw new Error(`Invalid board`);\n    }\n};\n// Isolate a player's moves and set their value to align with winning board patterns.\nconst normalizeBoardForPlayer = (board, player) => {\n    if (player !== 'x' && player !== 'o') {\n        console.log(player);\n        throw new Error(`Invalid player`);\n    }\n    const newBoard = new grid_1.Grid3x3();\n    board.forEach((value, position) => {\n        newBoard.setPosition(position, value === player ? true : null);\n    });\n    return newBoard;\n};\n// Compare a filtered game board with a board representing a minimum winning pattern.\n// If the given pattern board is contained within the game board, return true.\nconst matchingBoards = (gameBoard) => (patternBoard) => {\n    validateBoard(gameBoard);\n    return gameBoard.contains(patternBoard);\n};\n// Check if a given gameboard allows a player to win the game.\nconst isWinningBoard = (gameBoard, player) => {\n    validateBoard(gameBoard);\n    return (winningBoards.findIndex(matchingBoards(normalizeBoardForPlayer(gameBoard, player))) > -1);\n};\n// Print the board as a string to the console.\nconst printBoard = (board) => {\n    let output = board\n        .exportGrid()\n        .map((row) => row.map((val) => (val === null ? '-' : val)).join(' '))\n        .join('\\n');\n    console.log(output);\n};\n// Create a new board object representing the board state given a player move.\nconst doMove = (player, position, board) => {\n    validateBoard(board);\n    if (position === undefined || !Array.isArray(position)) {\n        throw new Error(`Invalid position`);\n    }\n    const [row, column] = position;\n    if (row === undefined || column === undefined) {\n        throw new Error(`Invalid position`);\n    }\n    if (!Number.isInteger(row) || !Number.isInteger(column)) {\n        throw new Error(`Invalid position`);\n    }\n    try {\n        board.getPosition(position);\n    }\n    catch (e) {\n        throw new Error(`Invalid position`);\n    }\n    if (player !== 'x' && player !== 'o') {\n        throw new Error(`Invalid player`);\n    }\n    if (board.getPosition(position) !== null) {\n        throw new Error(`Position not null`);\n    }\n    board.setPosition(position, player);\n    return board;\n};\n// Generate a new game object that can be used from the command line or browser.\nconst newGame = () => {\n    let board = newBoard();\n    let gameOver = false;\n    let lastPlayer = null;\n    let firstPlayer = null;\n    let winner = null;\n    const history = Array();\n    return {\n        nextMove: (player, position) => {\n            if (gameOver) {\n                console.log(`The game is over!`);\n                return;\n            }\n            if (player === lastPlayer) {\n                console.log(`${player} already went. Please wait.`);\n                return;\n            }\n            board = doMove(player, position, board);\n            history.push([player, position]);\n            lastPlayer = player;\n            firstPlayer = firstPlayer === null ? player : firstPlayer;\n            const result = isWinningBoard(board, player);\n            if (result !== false) {\n                winner = player;\n                gameOver = true;\n            }\n            if (history.length === 9) {\n                gameOver = true;\n            }\n        },\n        isOver: () => gameOver,\n        getBoard: () => board.exportGrid(),\n        printBoard: () => printBoard(board),\n        winner: () => winner,\n        export: () => ({\n            winner,\n            firstPlayer,\n            board: board.exportGrid(),\n            history: [...history],\n        }),\n    };\n};\nmodule.exports = {\n    newGame,\n    unit: {\n        doMove,\n        printBoard,\n        isWinningBoard,\n        matchingBoards,\n        normalizeBoardForPlayer,\n        validateBoard,\n        winningBoards,\n        newBoard,\n    },\n};\n\n\n//# sourceURL=webpack://tictactoe/./src/tictactoe.ts?");

/***/ }),

/***/ "./src/browser.js":
/*!************************!*\
  !*** ./src/browser.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const tictactoe = __webpack_require__(/*! ./tictactoe */ \"./src/tictactoe.ts\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  let game;\n  let player;\n  let board;\n  const container = document.getElementById('game');\n  const messageEl = container.querySelector('h1');\n  const statusEl = container.querySelector('p');\n\n  const renderBoard = () => {\n    board = game.getBoard();\n    board.forEach((row, r) => {\n      row.forEach((cell, c) => {\n        const containerCell = container.querySelector(\n          `table tr:nth-child(${r + 1}) td:nth-child(${c + 1})`\n        );\n        const el = document.createElement('button');\n        if (cell === null) {\n          el.innerHTML = '&nbsp;';\n          // eslint-disable-next-line no-use-before-define\n          el.onclick = () => nextMove([r, c]);\n        } else {\n          el.innerText = cell;\n          el.disabled = true;\n        }\n        while (containerCell.firstChild) {\n          containerCell.removeChild(containerCell.firstChild);\n        }\n        containerCell.appendChild(el);\n      });\n    });\n    statusEl.innerText = game.isOver() ? 'Game over' : `${player} turn`;\n  };\n\n  const nextMove = ([row, column]) => {\n    game.nextMove(player, [row, column]);\n    player = player === 'x' ? 'o' : 'x';\n    renderBoard();\n    if (game.isOver() && game.winner() !== null) {\n      messageEl.innerText = `${game.winner()} has won the game!`;\n      container.querySelectorAll('table button').forEach((el) => {\n        // eslint-disable-next-line no-param-reassign\n        el.disabled = true;\n      });\n    }\n    if (game.isOver() && game.winner() === null) {\n      messageEl.innerText = `It's a draw game!`;\n    }\n  };\n\n  const reset = () => {\n    game = tictactoe.newGame();\n    player = 'x';\n    renderBoard();\n    messageEl.innerText = '';\n  };\n  reset();\n\n  container.querySelector(`#reset`).onclick = reset;\n});\n\n\n//# sourceURL=webpack://tictactoe/./src/browser.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/browser.js");
/******/ 	
/******/ })()
;