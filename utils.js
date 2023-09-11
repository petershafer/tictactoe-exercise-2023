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

const positions = () => [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];

function shuffle (arr) {
    const orig = [...arr];
    const shuffled = [];
    while (orig.length > 0) {
        shuffled.push(orig.splice(Math.floor(Math.random() * orig.length), 1)[0]);
    }
    return shuffled;
}

const mapToMoves = (positions) => positions.map((pos, i) => [i % 2 == 0 ? 'x' : 'o', pos]);

const randomHistory = () => mapToMoves(shuffle(positions()));

const randomGame = () => playbackGame(randomHistory())

module.exports = {
    playbackGame,
    shuffle,
    positions,
    mapToMoves,
    randomHistory,
    randomGame,
};