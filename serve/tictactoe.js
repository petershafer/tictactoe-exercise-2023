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

/***/ "./browser.js":
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const tictactoe = __webpack_require__(/*! ./tictactoe */ \"./tictactoe.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  let game;\n  let player;\n  let board;\n  const container = document.getElementById('game');\n  const messageEl = container.querySelector('h1');\n  const statusEl = container.querySelector('p');\n\n  const renderBoard = () => {\n    board = game.getBoard();\n    board.forEach((row, r) => {\n      row.forEach((cell, c) => {\n        const containerCell = container.querySelector(\n          `table tr:nth-child(${r + 1}) td:nth-child(${c + 1})`\n        );\n        const el = document.createElement('button');\n        if (cell === null) {\n          el.innerHTML = '&nbsp;';\n          // eslint-disable-next-line no-use-before-define\n          el.onclick = () => nextMove([r, c]);\n        } else {\n          el.innerText = cell;\n          el.disabled = true;\n        }\n        while (containerCell.firstChild) {\n          containerCell.removeChild(containerCell.firstChild);\n        }\n        containerCell.appendChild(el);\n      });\n    });\n    statusEl.innerText = game.isOver() ? 'Game over' : `${player} turn`;\n  };\n\n  const nextMove = ([row, column]) => {\n    game.nextMove(player, [row, column]);\n    player = player === 'x' ? 'o' : 'x';\n    renderBoard();\n    if (game.isOver() && game.winner() !== null) {\n      messageEl.innerText = `${game.winner()} has won the game!`;\n      container.querySelectorAll('table button').forEach((el) => {\n        // eslint-disable-next-line no-param-reassign\n        el.disabled = true;\n      });\n    }\n    if (game.isOver() && game.winner() === null) {\n      messageEl.innerText = `It's a draw game!`;\n    }\n  };\n\n  const reset = () => {\n    game = tictactoe.newGame();\n    player = 'x';\n    renderBoard();\n    messageEl.innerText = '';\n  };\n  reset();\n\n  container.querySelector(`#reset`).onclick = reset;\n});\n\n\n//# sourceURL=webpack://tictactoe/./browser.js?");

/***/ }),

/***/ "./tictactoe.js":
/*!**********************!*\
  !*** ./tictactoe.js ***!
  \**********************/
/***/ (function(module) {

"use strict";
eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n// Generate 2D array that is 3x3 and defaulted to null values.\nvar newBoard = function () { return Array(3).fill(Array(3).fill(null)); };\nvar winsByRow = function () {\n    // Generate boards with winning patterns for the given rows.\n    return [0, 1, 2].map(function (row) {\n        var board = newBoard();\n        board[row] = [true, true, true];\n        return board;\n    });\n};\n// Generate boards with winning patterns for the given columns.\nvar winsByColumn = function () {\n    return [0, 1, 2].map(function (column) {\n        var board = newBoard();\n        return board.map(function (row) {\n            var newRow = __spreadArray([], row, true);\n            newRow[column] = true;\n            return newRow;\n        });\n    });\n};\n// Generate boards with winning diagonal patterns.\nvar winsByDiag = function () { return [\n    // index represents row, value represents position held by player.\n    [0, 1, 2].map(function (r) { return [r === 0 || null, r === 1 || null, r === 2 || null]; }),\n    [2, 1, 0].map(function (r) { return [r === 0 || null, r === 1 || null, r === 2 || null]; }),\n]; };\n// Aggregation of all winning boards.\n// NOTE: A winning board represents the minimum positions a player must hold\n// for the pattern to create a winning board. Player may hold additional positions.\nvar winningBoards = __spreadArray(__spreadArray(__spreadArray([], winsByRow(), true), winsByColumn(), true), winsByDiag(), true);\n// Check shape and values of board for validity.\nvar validateBoard = function (board) {\n    if (!board || !board.length || board.length !== 3) {\n        throw new Error(\"Invalid board\");\n    }\n    board.forEach(function (row) {\n        if (!row || !row.length || row.length !== 3) {\n            throw new Error(\"Invalid board\");\n        }\n        if (!row.every(function (cell) { return cell === 'x' || cell === 'o' || cell === null || cell === true; })) {\n            throw new Error(\"Invalid board\");\n        }\n    });\n};\n// Isolate a player's moves and set their value to align with winning board patterns.\nvar normalizeBoardForPlayer = function (board, player) {\n    if (player !== 'x' && player !== 'o') {\n        console.log(player);\n        throw new Error(\"Invalid player\");\n    }\n    return board.map(function (row) {\n        return row.map(function (column) {\n            if (column === player) {\n                return true;\n            }\n            return null;\n        });\n    });\n};\n// Compare a filtered game board with a board representing a minimum winning pattern.\n// If the given pattern board is contained within the game board, return true.\nvar matchingBoards = function (gameBoard) { return function (patternBoard) {\n    validateBoard(gameBoard);\n    for (var i = 0; i < patternBoard.length; i++) {\n        for (var j = 0; j < patternBoard[i].length; j++) {\n            if (patternBoard[i][j] === true && gameBoard[i][j] === null) {\n                return false;\n            }\n        }\n    }\n    return true;\n}; };\n// Check if a given gameboard allows a player to win the game.\nvar isWinningBoard = function (gameBoard, player) {\n    validateBoard(gameBoard);\n    return (winningBoards.findIndex(matchingBoards(normalizeBoardForPlayer(gameBoard, player))) > -1);\n};\n// Print the board as a string to the console.\nvar printBoard = function (board) {\n    console.log(board\n        .map(function (row) {\n        return row.map(function (place) { return (place === null ? '-' : place); }).join(' ');\n    })\n        .join('\\n'));\n};\n// Create a new board object representing the board state given a player move.\nvar doMove = function (player, _a, board) {\n    var row = _a[0], column = _a[1];\n    validateBoard(board);\n    if (row === undefined || column === undefined) {\n        throw new Error(\"Invalid position\");\n    }\n    if (!Number.isInteger(row) || !Number.isInteger(column)) {\n        throw new Error(\"Invalid position\");\n    }\n    if (board[row] === undefined || board[row][column] === undefined) {\n        throw new Error(\"Invalid position\");\n    }\n    if (player !== 'x' && player !== 'o') {\n        throw new Error(\"Invalid player\");\n    }\n    if (board[row][column] !== null) {\n        throw new Error(\"Position not null\");\n    }\n    var nextBoard = board.map(function (prevRow, i) {\n        var newRow = __spreadArray([], prevRow, true);\n        if (i === row) {\n            newRow[column] = player;\n        }\n        return newRow;\n    });\n    return nextBoard;\n};\n// Generate a new game object that can be used from the command line or browser.\nvar newGame = function () {\n    var board = newBoard();\n    var gameOver = false;\n    var lastPlayer = null;\n    var firstPlayer = null;\n    var winner = null;\n    var history = Array();\n    return {\n        nextMove: function (player, position) {\n            if (gameOver) {\n                console.log(\"The game is over!\");\n                return;\n            }\n            if (player === lastPlayer) {\n                console.log(\"\".concat(player, \" already went. Please wait.\"));\n                return;\n            }\n            board = doMove(player, position, board);\n            history.push([player, position]);\n            lastPlayer = player;\n            firstPlayer = firstPlayer === null ? player : firstPlayer;\n            var result = isWinningBoard(board, player);\n            if (result !== false) {\n                winner = player;\n                gameOver = true;\n            }\n            if (history.length === 9) {\n                gameOver = true;\n            }\n        },\n        isOver: function () { return gameOver; },\n        getBoard: function () { return board; },\n        printBoard: function () { return printBoard(board); },\n        winner: function () { return winner; },\n        export: function () { return ({\n            winner: winner,\n            firstPlayer: firstPlayer,\n            board: __spreadArray([], board, true),\n            history: __spreadArray([], history, true),\n        }); },\n    };\n};\nmodule.exports = {\n    newGame: newGame,\n    unit: {\n        doMove: doMove,\n        printBoard: printBoard,\n        isWinningBoard: isWinningBoard,\n        matchingBoards: matchingBoards,\n        normalizeBoardForPlayer: normalizeBoardForPlayer,\n        validateBoard: validateBoard,\n        winningBoards: winningBoards,\n        getBoard: newBoard,\n    },\n};\n//# sourceMappingURL=tictactoe.js.map\n\n//# sourceURL=webpack://tictactoe/./tictactoe.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./browser.js");
/******/ 	
/******/ })()
;