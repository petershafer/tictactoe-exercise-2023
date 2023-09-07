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

module.exports = {
    playbackGame,
};