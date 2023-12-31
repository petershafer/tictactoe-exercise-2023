// const { playbackGame, randomGame } = require('./utils');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const tictactoe = require('./tictactoe');

// console.log(`Here it is`);
// console.log(tictactoe.winBoards);

// console.log(tictactoe.isWinningBoard([
//     ['x','x','x'],
//     ['o','o',null],
//     [null,null,null],
// ]));

// console.log(tictactoe.doMove('x', [2,1], [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ]));

// const gameA = [
//   // ['x', [0,0]],
//   // ['o', [1,0]],
//   // ['x', [0,1]],
//   // ['o', [1,1]],
//   // ['x', [0,2]],
//   // ['o', [1,2]],
//   ['x', [2, 0]],
//   ['o', [2, 1]],
//   ['x', [2, 2]],
//   ['o', [1, 0]],
//   ['x', [1, 1]],
//   ['o', [1, 2]],
//   ['x', [0, 1]],
//   ['o', [0, 2]],
//   ['x', [0, 0]],
// ];

// playbackGame(gameA);

async function play() {
  const rl = readline.createInterface({ input, output });
  let response;
  const game = tictactoe.newGame();
  let player = 'x';

  console.log(`Let's play a game.`);
  while (!game.isOver()) {
    game.printBoard();
    // eslint-disable-next-line no-await-in-loop
    response = await rl.question(`What is ${player}'s next move? `);
    response = response.trim().split(',');
    try {
      game.nextMove(player, [
        Number.parseInt(response[0], 10),
        Number.parseInt(response[1], 10),
      ]);
    } catch (e) {
      console.log(`Invalid move.`);
      // eslint-disable-next-line no-continue
      continue;
    }
    player = player === 'x' ? 'o' : 'x';
    if (game.isOver()) {
      if (game.winner() === null) {
        console.log(`It's a draw game!`);
      } else {
        console.log(`${game.winner()} has won the game!`);
      }
      game.printBoard();
    }
  }

  rl.close();

  console.log(`We're done`);
}
play();

// randomGame();
