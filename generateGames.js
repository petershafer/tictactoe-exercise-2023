const { categorize, randomGame, playbackGame, stripPlayerFromHistory, compressHistory, decompressHistory, applyPlayersToHistory } = require('./utils');

let game, history, outcome, gameString, firstPlayer;

for (let i = 0; i < 10; i++) {
    game = randomGame();
    history = stripPlayerFromHistory(game.export().history);
    outcome = categorize(game);
    gameString = compressHistory(history);
    console.log([outcome, gameString]);
    decompressedHistory = decompressHistory(gameString);
    firstPlayer = game.export().firstPlayer;
    decompressedHistory = applyPlayersToHistory(decompressedHistory, firstPlayer);
    playbackGame(decompressedHistory, false);
}
