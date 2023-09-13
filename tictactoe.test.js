const tictactoe = require('./tictactoe');
const { playbackGame } = require('./utils');

describe('newGame()', () => {
  it('Should return a game object', () => {
    const game = tictactoe.newGame();
    expect(typeof game).toBe('object');
  });
});

describe('game object', () => {
  it('Should have nextMove function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.nextMove).toBe('function');
  });
  it('Should have isOver function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.isOver).toBe('function');
  });
  it('Should have getBoard function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.getBoard).toBe('function');
  });
  it('Should have printBoard function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.printBoard).toBe('function');
  });
  it('Should have winner function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.winner).toBe('function');
  });
});

describe('game outcomes', () => {
  it('Scenario #1 should result in an X win', () => {
    const ScenarioOne = [
      ['x', [0, 0]],
      ['o', [1, 0]],
      ['x', [0, 1]],
      ['o', [1, 1]],
      ['x', [0, 2]],
      ['o', [1, 2]],
    ];
    const game = playbackGame(ScenarioOne);
    expect(game.isOver()).toBeTruthy();
    expect(game.winner()).toBe('x');
  });
});
