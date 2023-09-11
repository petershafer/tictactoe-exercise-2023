const tictactoe = require('./tictactoe');

function playbackGame (moveHistory) {
    let game = tictactoe.newGame();
    console.log(`Let's play a game.`);
    let i = 0;
    while (i < moveHistory.length && !game.isOver()) {
        console.log(`${moveHistory[i][0]} chooses position ${moveHistory[i][1]}`);
        game.nextMove(...moveHistory[i]);
        if (game.isOver()) {
            game.printBoard();
            if (game.winner() === null) {
                console.log(`It's a draw game!`);
                return null;
            } else {
                console.log(`${game.winner()} has won the game!`);
            }
        }
        i++;
    }
    return game;
}

const positions = () => Array(9).fill(null).map((_, i) => [Math.floor(i/3), Math.floor(i%3)]);

function shuffle (arr) {
    const orig = [...arr];
    const shuffled = [];
    while (orig.length > 0) {
        shuffled.push(orig.splice(Math.floor(Math.random() * orig.length), 1)[0]);
    }
    return shuffled;
}

const whichPlayer = (turn, firstPlayer) => turn % 2 == 0 ? firstPlayer : (firstPlayer === 'x' ? 'o' : 'x')

const mapToMoves = (positions, firstPlayer = 'x') => positions.map((pos, i) => [whichPlayer(i, firstPlayer), pos]);

const randomHistory = () => mapToMoves(shuffle(positions()));

const randomGame = () => playbackGame(randomHistory())

const toOneDim = ([row,col]) => (row * 3) + col;

const fromOneDim = (index) => [Math.floor(index / 3), Math.floor(index % 3)];

const compressHistory = (history) => JSON.stringify(history.map(toOneDim));

const decompressHistory = (history) => JSON.parse(history).map(fromOneDim);

const stripPlayerFromHistory = (history) => history.map(([_, position]) => position);

const applyPlayersToHistory = (history, firstPlayer = 'x') => history.map((position, i) => [whichPlayer(i, firstPlayer), position]);

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
};