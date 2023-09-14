const tictactoe = require('./tictactoe');

document.addEventListener('DOMContentLoaded', () => {
  let game;
  let player;
  const container = document.getElementById('game');
  const messageEl = container.querySelector('h1');
  const statusEl = container.querySelector('p');

  const renderBoard = () => {
    board = game.getBoard();
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        let containerCell = container.querySelector(
          `table tr:nth-child(${r + 1}) td:nth-child(${c + 1})`
        );
        let el = document.createElement('button');
        if (cell === null) {
          el.innerHTML = '&nbsp;';
          el.onclick = () => nextMove([r, c]);
        } else {
          el.innerText = cell;
          el.disabled = true;
        }
        while (containerCell.firstChild) {
          containerCell.removeChild(containerCell.firstChild);
        }
        containerCell.appendChild(el);
      });
    });
    statusEl.innerText = game.isOver() ? 'Game over' : `${player} turn`;
  };

  const nextMove = ([row, column]) => {
    game.nextMove(player, [row, column]);
    player = player === 'x' ? 'o' : 'x';
    renderBoard();
    if (game.isOver() && game.winner() !== null) {
      messageEl.innerText = `${game.winner()} has won the game!`;
      container
        .querySelectorAll('table button')
        .forEach((el) => (el.disabled = true));
    }
    if (game.isOver() && game.winner() === null) {
      messageEl.innerText = `It's a draw game!`;
    }
  };

  const reset = () => {
    game = tictactoe.newGame();
    player = 'x';
    renderBoard();
    messageEl.innerText = '';
  };
  reset();

  container.querySelector(`#reset`).onclick = reset;
});
