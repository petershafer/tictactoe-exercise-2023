const { categorize, randomGame, playbackGame, stripPlayerFromHistory, compressHistory, decompressHistory, applyPlayersToHistory } = require('./utils');

let game, history, outcome, gameString;

for (let i = 0; i < 10; i++) {
    game = randomGame();
    history = stripPlayerFromHistory(game.export().history);
    outcome = categorize(game);
    gameString = compressHistory(history);
    console.log(`${outcome}: ${gameString}`);
    decompressedHistory = decompressHistory(gameString);
    console.log(game.export().firstPlayer);
    decompressedHistory = applyPlayersToHistory(decompressedHistory, game.winner());
    console.log(decompressedHistory);
    playbackGame(decompressedHistory);
}
