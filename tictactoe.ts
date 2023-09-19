import { Grid3x3 } from './grid';
/**
 * NOTES:
 * Type assertions are used here where the map function is applied to a tuple.
 * TypeScript does not consider the output of a mapped tuple to have the same
 * length as the original tuple. I decided to prefer type assertions over explicitly
 * creating new arrays of the same length of the original tuple, with each element
 * explicitly assigned to each part of the tuple. This may be an indicator to
 * adjust the data model.
 */
type PlayerValue = 'x' | 'o';
type PositionValue = null | PlayerValue;
type Row = [PositionValue, PositionValue, PositionValue];
type Board = [Row, Row, Row];

type PatternPosition = null | true;
type PatternRow = [PatternPosition, PatternPosition, PatternPosition];
type PatternBoard = [PatternRow, PatternRow, PatternRow];

type CoordValue = 0 | 1 | 2;
type Coord = [CoordValue, CoordValue];

// Generate 2D array that is 3x3 and defaulted to null values.
const newBoard = (): Board => Array(3).fill(Array(3).fill(null)) as Board;
const newPatternBoard = (): PatternBoard =>
  Array(3).fill(Array(3).fill(null)) as PatternBoard;

const winsByRow = (): PatternBoard[] =>
  // Generate boards with winning patterns for the given rows.
  [0, 1, 2].map((row) => {
    const board = newPatternBoard();
    board[row] = [true, true, true];
    return board;
  });

// Generate boards with winning patterns for the given columns.
const winsByColumn = (): PatternBoard[] =>
  [0, 1, 2].map((column) => {
    const board = newPatternBoard().map((row): PatternRow => {
      const newRow = [...row];
      newRow[column] = true;
      return newRow as PatternRow;
    });
    return board as PatternBoard;
  });

// Generate boards with winning diagonal patterns.
const winsByDiag = (): PatternBoard[] => [
  // index represents row, value represents position held by player.
  [0, 1, 2].map(
    (r): PatternRow =>
      [r === 0 || null, r === 1 || null, r === 2 || null] as PatternRow
  ) as PatternBoard,
  [2, 1, 0].map(
    (r) => [r === 0 || null, r === 1 || null, r === 2 || null] as PatternRow
  ) as PatternBoard,
];

// Aggregation of all winning boards.
// NOTE: A winning board represents the minimum positions a player must hold
// for the pattern to create a winning board. Player may hold additional positions.
const winningBoards = [...winsByRow(), ...winsByColumn(), ...winsByDiag()];

// Check shape and values of board for validity.
const validateBoard = (board: Board | PatternBoard) => {
  if (!board || !board.length || board.length !== 3) {
    throw new Error(`Invalid board`);
  }
  board.forEach((row: Row | PatternRow) => {
    if (!row || !row.length || row.length !== 3) {
      throw new Error(`Invalid board`);
    }
    if (
      // @ts-ignore: Unreachable code error
      !row.every(
        (cell: PositionValue | PatternPosition) =>
          cell === 'x' || cell === 'o' || cell === null || cell === true
      )
    ) {
      throw new Error(`Invalid board`);
    }
  });
};

// Isolate a player's moves and set their value to align with winning board patterns.
const normalizeBoardForPlayer = (
  board: Board,
  player: PlayerValue
): PatternBoard => {
  if (player !== 'x' && player !== 'o') {
    console.log(player);
    throw new Error(`Invalid player`);
  }
  const newBoard = board.map((row: Row) => {
    return row.map((column): PatternPosition => {
      if (column === player) {
        return true;
      }
      return null;
    }) as PatternRow;
  });
  return newBoard as PatternBoard;
};

// Compare a filtered game board with a board representing a minimum winning pattern.
// If the given pattern board is contained within the game board, return true.
const matchingBoards =
  (gameBoard: PatternBoard) => (patternBoard: PatternBoard) => {
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
const isWinningBoard = (gameBoard: Board, player: PlayerValue) => {
  validateBoard(gameBoard);
  return (
    winningBoards.findIndex(
      matchingBoards(normalizeBoardForPlayer(gameBoard, player))
    ) > -1
  );
};

// Print the board as a string to the console.
const printBoard = (board: Board) => {
  console.log(
    board
      .map((row) =>
        row
          .map((place: PositionValue) => (place === null ? '-' : place))
          .join(' ')
      )
      .join('\n')
  );
};

// Create a new board object representing the board state given a player move.
const doMove = (player: PlayerValue, position: Coord, board: Board): Board => {
  const [row, column] = position;
  validateBoard(board);
  if (row === undefined || column === undefined) {
    throw new Error(`Invalid position`);
  }
  if (!Number.isInteger(row) || !Number.isInteger(column)) {
    throw new Error(`Invalid position`);
  }
  if (board[row] === undefined || board[row][column] === undefined) {
    throw new Error(`Invalid position`);
  }
  if (player !== 'x' && player !== 'o') {
    throw new Error(`Invalid player`);
  }
  if (board[row][column] !== null) {
    throw new Error(`Position not null`);
  }
  const nextBoard = board.map((prevRow: Row, i: number): Row => {
    const newRow = [...prevRow];
    if (i === row) {
      newRow[column] = player;
    }
    return newRow as Row;
  });
  return nextBoard as Board;
};

// Generate a new game object that can be used from the command line or browser.
const newGame = () => {
  let board = newBoard();
  let gameOver = false;
  let lastPlayer: PositionValue = null;
  let firstPlayer: PositionValue = null;
  let winner: PlayerValue | null = null;
  const history = Array();
  return {
    nextMove: (player: PlayerValue, position: Coord) => {
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
    getBoard: () => board,
    printBoard: () => printBoard(board),
    winner: () => winner,
    export: () => ({
      winner,
      firstPlayer,
      board: [...board],
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
    getBoard: newBoard,
  },
};
