const tictactoe = require('./dist/tictactoe');

function playbackGame(moveHistory, verbose = true) {
  let game = tictactoe.newGame();
  verbose && console.log(`Let's play a game.`);
  let i = 0;
  while (i < moveHistory.length && !game.isOver()) {
    verbose &&
      console.log(`${moveHistory[i][0]} chooses position ${moveHistory[i][1]}`);
    game.nextMove(...moveHistory[i]);
    if (game.isOver()) {
      verbose && game.printBoard();
      if (game.winner() === null) {
        verbose && console.log(`It's a draw game!`);
        return game;
      } else {
        verbose && console.log(`${game.winner()} has won the game!`);
      }
    }
    i++;
  }
  return game;
}

const positions = () =>
  Array(9)
    .fill(null)
    .map((_, i) => [Math.floor(i / 3), Math.floor(i % 3)]);

function shuffle(arr) {
  const orig = [...arr];
  const shuffled = [];
  while (orig.length > 0) {
    shuffled.push(orig.splice(Math.floor(Math.random() * orig.length), 1)[0]);
  }
  return shuffled;
}

const getWinPatterns = () => ({
  v1: [
    [true, null, null],
    [true, null, null],
    [true, null, null],
  ],
  v2: [
    [null, true, null],
    [null, true, null],
    [null, true, null],
  ],
  v3: [
    [null, null, true],
    [null, null, true],
    [null, null, true],
  ],
  h1: [
    [true, true, true],
    [null, null, null],
    [null, null, null],
  ],
  h2: [
    [null, null, null],
    [true, true, true],
    [null, null, null],
  ],
  h3: [
    [null, null, null],
    [null, null, null],
    [true, true, true],
  ],
  d1: [
    [true, null, null],
    [null, true, null],
    [null, null, true],
  ],
  d2: [
    [null, null, true],
    [null, true, null],
    [true, null, null],
  ],
});

function categorize(game) {
  if (!game.isOver()) {
    throw new Error(`Game is not complete`);
  }
  const { history, winner, board } = game.export();
  if (winner === null && history.length < 9) {
    throw new Error(`Invalid game state`);
  }
  const filteredBoard = board.map((row) =>
    row.map((cell) => (cell === game.winner() ? true : null))
  );
  const winPatterns = getWinPatterns();
  const winLabels = [];
  let matches;
  for (const [label, pattern] of Object.entries(winPatterns)) {
    matches = true;
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        if (pattern[i][j] === true && filteredBoard[i][j] === null) {
          matches = false;
        }
      }
    }
    if (matches) {
      winLabels.push(label);
    }
  }
  if (winLabels.length === 0) {
    winLabels.push('draw');
  }
  return winLabels;
}

const whichPlayer = (turn, firstPlayer) =>
  turn % 2 == 0 ? firstPlayer : firstPlayer === 'x' ? 'o' : 'x';

const mapToMoves = (positions, firstPlayer = 'x') =>
  positions.map((pos, i) => [whichPlayer(i, firstPlayer), pos]);

const randomHistory = () => mapToMoves(shuffle(positions()));

const randomGame = () => playbackGame(randomHistory(), false);

const toOneDim = ([row, col]) => row * 3 + col;

const fromOneDim = (index) => [Math.floor(index / 3), Math.floor(index % 3)];

const compressHistory = (history) => history.map(toOneDim).join(',');

const decompressHistory = (history) =>
  history
    .split(',')
    .map((val) => val.trim())
    .map(fromOneDim);

const stripPlayerFromHistory = (history) =>
  history.map(([_, position]) => position);

const applyPlayersToHistory = (history, firstPlayer = 'x') =>
  history.map((position, i) => [whichPlayer(i, firstPlayer), position]);

module.exports = {
  playbackGame,
  shuffle,
  positions,
  mapToMoves,
  randomHistory,
  randomGame,
  compressHistory,
  decompressHistory,
  stripPlayerFromHistory,
  applyPlayersToHistory,
  getWinPatterns,
  categorize,
};
