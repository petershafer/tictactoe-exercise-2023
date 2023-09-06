// Generate 2D array that is 3x3 and defaulted to null values.
const newBoard = () => Array(3).fill(Array(3).fill(null));

const winsByRow = () => {
    // Generate boards with winning patterns for the given rows.
    return [0,1,2].map((row) => {
        const board = newBoard();
        board[row] = [true, true, true];
        return board;
    });
};

const winsByColumn = () => {
    // Generate boards with winning patterns for the given columns.
    return [0,1,2].map((column) => {
        const board = newBoard();
        return board.map((row) => {
            const newRow = [...row];
            newRow[column] = true;
            return newRow;
        });
    });
};

// Generate boards with winning diagonal patterns.
const winsByDiag = () => [
    // index represents row, value represents position held by player.
    [0,1,2].map(r => [r === 0 || null, r === 1 || null, r === 2 || null]),
    [2,1,0].map(r => [r === 0 || null, r === 1 || null, r === 2 || null])
]

// Aggregation of all winning boards.
// NOTE: A winning board represents the minimum positions a player must hold
// for the pattern to create a winning board. Player may hold additional positions.
const winningBoards = [
    ...winsByRow(),
    ...winsByColumn(),
    ...winsByDiag(),
];

// Check shape and values of board for validity.
const validateBoard = (board) => {
    if (
        !board
        || !board.length
        || board.length != 3
    ) {
        throw new Error(`Invalid board`);
    }
    board.forEach((row) => {
        if (
            !row
            || !row.length
            || row.length != 3
        ) {
            throw new Error(`Invalid board`);
        }
        if (!row.every(cell => cell === 'x' || cell === 'o' || cell === null || cell === true)){
            throw new Error(`Invalid board`);
        }
    });
};

// Isolate a player's moves and set their value to align with winning board patterns.
const normalizeBoardForPlayer = (board, player) => {
    if (player !== 'x' && player !== 'o') {
        console.log(player);
        throw new Error(`Invalid player`);
    }
    return board.map((row) => {
        return row.map((column) => {
            if (column === player) {
                return true;
            } else {
                return null;
            }
        });
    });
};

// Compare a filtered game board with a board representing a minimum winning pattern.
// If the given pattern board is contained within the game board, return true.
const matchingBoards = (gameBoard) => (patternBoard) => {
    validateBoard(gameBoard);
    for (let i = 0; i < patternBoard.length; i++) {
        for (let j = 0; j < patternBoard[i].length; j++) {
            if (patternBoard[i][j] === true && gameBoard[i][j] === null) {
                return false;
            }
        }
    }
    return true;
};

// Check if a given gameboard allows a player to win the game.
const isWinningBoard = (gameBoard, player) => {
    validateBoard(gameBoard);
    return winningBoards.findIndex(matchingBoards(normalizeBoardForPlayer(gameBoard, player))) > -1;
};

// Print the board as a string to the console.
const printBoard = (board) => {
    console.log(board.map((row, i) => row.map(place => (place === null ? '-' : place)).join(' ')).join('\n'));
};

// Create a new board object representing the board state given a player move.
const doMove = (player, [row, column], board) => {
    validateBoard(board);
    if (row === undefined || column === undefined) {
        throw new Error(`Invalid position`);
    }
    if (!Number.isInteger(row) || !Number.isInteger(column)) {
        throw new Error(`Invalid position`);
    }
    if (player !== 'x' && player !== 'o') {
        throw new Error(`Invalid player`);
    }
    if (board[row][column] !== null) {
        throw new Error(`Position not null`);
    }
    const nextBoard = board.map((prevRow, i) => {
        const newRow = [...prevRow];
        if (i === row) {
            newRow[column] = player;
        }
        return newRow;
    });
    return nextBoard;
}

// Generate a new game object that can be used from the command line or browser.
const newGame = () => {
    let board = newBoard();
    let gameOver = false;
    let lastPlayer = null;
    let winner = null;
    const history = [];
    return {
        nextMove: (player, position) => {
            if (gameOver) {
                console.log(`The game is over!`);
                return;
            }
            if (player == lastPlayer) {
                console.log(`${player} already went. Please wait.`);
                return;
            }
            board = doMove(player, position, board);
            history.push([player, position]);
            lastPlayer = player;
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
        getBoard: () => board,
        printBoard: () => printBoard(board),
        winner: () => winner,
    }
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
        getBoard: newBoard,
    },
};