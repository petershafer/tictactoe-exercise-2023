"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
// Generate 2D array that is 3x3 and defaulted to null values.
const newBoard = () => new grid_1.Grid3x3().fill(null);
const newPatternBoard = () => new grid_1.Grid3x3().fill(null);
const winsByRow = () => 
// Generate boards with winning patterns for the given rows.
[0, 1, 2].map((row) => newPatternBoard().setRow(row, [true, true, true]));
// Generate boards with winning patterns for the given columns.
const winsByColumn = () => [0, 1, 2].map((column) => newPatternBoard().setColumn(column, [true, true, true]));
// Generate boards with winning diagonal patterns.
const winsByDiag = () => [
    // index represents row, value represents position held by player.
    newPatternBoard().map((_, [row, col]) => (row === col ? true : null)),
    newPatternBoard().map((_, [row, col]) => (2 - row === col ? true : null)),
];
// Aggregation of all winning boards.
// NOTE: A winning board represents the minimum positions a player must hold
// for the pattern to create a winning board. Player may hold additional positions.
const winningBoards = [...winsByRow(), ...winsByColumn(), ...winsByDiag()];
// Check shape and values of board for validity.
const validateBoard = (board) => {
    if (!board || !(board instanceof grid_1.Grid3x3)) {
        throw new Error(`Invalid board`);
    }
    let valid = true;
    board.forEach((cell) => {
        valid =
            valid && (cell === 'x' || cell === 'o' || cell === null || cell === true);
    });
    if (!valid) {
        throw new Error(`Invalid board`);
    }
};
// Isolate a player's moves and set their value to align with winning board patterns.
const normalizeBoardForPlayer = (board, player) => {
    if (player !== 'x' && player !== 'o') {
        console.log(player);
        throw new Error(`Invalid player`);
    }
    const newBoard = new grid_1.Grid3x3();
    board.forEach((value, position) => {
        newBoard.setPosition(position, value === player ? true : null);
    });
    return newBoard;
};
// Compare a filtered game board with a board representing a minimum winning pattern.
// If the given pattern board is contained within the game board, return true.
const matchingBoards = (gameBoard) => (patternBoard) => {
    validateBoard(gameBoard);
    return gameBoard.contains(patternBoard);
};
// Check if a given gameboard allows a player to win the game.
const isWinningBoard = (gameBoard, player) => {
    validateBoard(gameBoard);
    return (winningBoards.findIndex(matchingBoards(normalizeBoardForPlayer(gameBoard, player))) > -1);
};
// Print the board as a string to the console.
const printBoard = (board) => {
    let output = '';
    board
        .exportGrid()
        .map((row) => row.map((val) => (val === null ? '-' : val)))
        .join('\n');
};
// Create a new board object representing the board state given a player move.
const doMove = (player, position, board) => {
    validateBoard(board);
    if (position === undefined || !Array.isArray(position)) {
        throw new Error(`Invalid position`);
    }
    const [row, column] = position;
    if (row === undefined || column === undefined) {
        throw new Error(`Invalid position`);
    }
    if (!Number.isInteger(row) || !Number.isInteger(column)) {
        throw new Error(`Invalid position`);
    }
    try {
        board.getPosition(position);
    }
    catch (e) {
        throw new Error(`Invalid position`);
    }
    if (player !== 'x' && player !== 'o') {
        throw new Error(`Invalid player`);
    }
    if (board.getPosition(position) !== null) {
        throw new Error(`Position not null`);
    }
    board.setPosition(position, player);
    return board;
};
// Generate a new game object that can be used from the command line or browser.
const newGame = () => {
    let board = newBoard();
    let gameOver = false;
    let lastPlayer = null;
    let firstPlayer = null;
    let winner = null;
    const history = Array();
    return {
        nextMove: (player, position) => {
            if (gameOver) {
                console.log(`The game is over!`);
                return;
            }
            if (player === lastPlayer) {
                console.log(`${player} already went. Please wait.`);
                return;
            }
            board = doMove(player, position, board);
            history.push([player, position]);
            lastPlayer = player;
            firstPlayer = firstPlayer === null ? player : firstPlayer;
            const result = isWinningBoard(board, player);
            if (result !== false) {
                winner = player;
                gameOver = true;
            }
            if (history.length === 9) {
                gameOver = true;
            }
        },
        isOver: () => gameOver,
        getBoard: () => board.exportGrid(),
        printBoard: () => printBoard(board),
        winner: () => winner,
        export: () => ({
            winner,
            firstPlayer,
            board: board.exportGrid(),
            history: [...history],
        }),
    };
};
module.exports = {
    newGame,
    unit: {
        doMove,
        printBoard,
        isWinningBoard,
        matchingBoards,
        normalizeBoardForPlayer,
        validateBoard,
        winningBoards,
        newBoard,
    },
};
//# sourceMappingURL=tictactoe.js.map