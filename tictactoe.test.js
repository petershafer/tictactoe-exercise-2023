const tictactoe = require('./tictactoe');
const { playbackGame } = require('./utils');
const { newBoard } = tictactoe.unit;

describe('tictactoe unit tests', () => {
  describe('newBoard()', () => {
    it('Should create a new 3x3 game board', () => {
      expect(newBoard().exportGrid()).toEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });
    it('Should create a new array every time', () => {
      expect(newBoard()).not.toBe(newBoard());
    });
  });
});

describe('tictactoe.newGame()', () => {
  it('Should return a game object', () => {
    const game = tictactoe.newGame();
    expect(typeof game).toBe('object');
  });
});

describe('game objects', () => {
  it('Should have nextMove function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.nextMove).toBe('function');
  });
  describe('nextMove function', () => {
    it('Should update the board appropriately', () => {
      const ScenarioOne = [['x', [0, 0]]];
      const game = playbackGame(ScenarioOne);
      expect(game.getBoard()).toEqual([
        ['x', null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });
    it('Should not allow a player to claim an occupied space', () => {
      const game = tictactoe.newGame();
      game.nextMove('x', [0, 0]);
      expect(() => {
        game.nextMove('o', [0, 0]);
      }).toThrow(new Error(`Position not null`));
      expect(game.getBoard()).toEqual([
        ['x', null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });
    it('Should not allow a player to play two moves in a row', () => {
      const game = tictactoe.newGame();
      game.nextMove('x', [0, 0]);
      game.nextMove('x', [0, 1]);
      expect(game.getBoard()).toEqual([
        ['x', null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });
    it('Should not allow a player to claim an illegal position', () => {
      const game = tictactoe.newGame();
      const startingBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
      expect(() => {
        game.nextMove('x', [-1, -1]);
      }).toThrow(new Error(`Invalid position`));
      expect(game.getBoard()).toEqual(startingBoard);
      expect(() => {
        game.nextMove('x', [3, 3]);
      }).toThrow(new Error(`Invalid position`));
      expect(game.getBoard()).toEqual(startingBoard);
      expect(() => {
        game.nextMove('x', [0, -1]);
      }).toThrow(new Error(`Invalid position`));
      expect(game.getBoard()).toEqual(startingBoard);
      expect(() => {
        game.nextMove('x', [-1, 0]);
      }).toThrow(new Error(`Invalid position`));
      expect(() => {
        game.nextMove('x');
      }).toThrow(new Error(`Invalid position`));
      expect(() => {
        game.nextMove('x', { row: 0, col: 0 });
      }).toThrow(new Error(`Invalid position`));
      expect(() => {
        game.nextMove('x', [null, null]);
      }).toThrow(new Error(`Invalid position`));
      expect(() => {
        game.nextMove('x', ['0', '0']);
      }).toThrow(new Error(`Invalid position`));
      expect(() => {
        game.nextMove('x', []);
      }).toThrow(new Error(`Invalid position`));
      expect(game.getBoard()).toEqual(startingBoard);
    });
    it('Should not allow a player to make a move after the game is over', () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
        ['x', [0, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      game.nextMove('o', [1, 2]);
      expect(game.getBoard()).toEqual([
        ['x', 'x', 'x'],
        ['o', 'o', null],
        [null, null, null],
      ]);
    });
    it(`Should only allow player 'x' and 'o' to make moves`, () => {
      const game = tictactoe.newGame();
      game.nextMove('x', [0, 0]);
      game.nextMove('o', [0, 1]);
      expect(() => {
        game.nextMove('0', [0, 2]);
      }).toThrow(new Error('Invalid player'));
      expect(() => {
        game.nextMove(0, [0, 2]);
      }).toThrow(new Error('Invalid player'));
      expect(game.getBoard()).toEqual([
        ['x', 'o', null],
        [null, null, null],
        [null, null, null],
      ]);
    });
  });
  it('Should have isOver function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.isOver).toBe('function');
  });
  describe('isOver function', () => {
    it('Should return false when game is not over', () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeFalsy();
    });
    it('Should return true when game is over', () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
        ['x', [0, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeTruthy();
    });
  });
  it('Should have getBoard function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.getBoard).toBe('function');
  });
  describe('getBoard function', () => {
    it('Should return a two-dimensional 3x3 array', () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
      ];
      const game = playbackGame(ScenarioOne);
      const board = game.getBoard();
      expect(Array.isArray(board)).toBeTruthy();
      expect(board).toHaveLength(3);
      board.forEach((row) => {
        expect(Array.isArray(row)).toBeTruthy();
        expect(row).toHaveLength(3);
      });
    });
    it(`Should only contain the values 'x', 'o' or null`, () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
      ];
      const game = playbackGame(ScenarioOne);
      const board = game.getBoard();
      board.forEach((row) => {
        row.forEach((value) => {
          expect(['x', 'o', null].includes(value)).toBeTruthy();
        });
      });
    });
  });
  it('Should have printBoard function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.printBoard).toBe('function');
  });
  describe('printBoard function', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Should call console.log', () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
      ];
      const spy = jest.spyOn(console, 'log');
      const game = playbackGame(ScenarioOne);
      game.printBoard();
      expect(spy).toHaveBeenCalled();
    });
  });
  it('Should have winner function', () => {
    const game = tictactoe.newGame();
    expect(typeof game.winner).toBe('function');
  });
  describe('winner function', () => {
    it(`Should return 'x' when 'x' wins the game`, () => {
      const ScenarioOne = [
        ['x', [0, 0]],
        ['o', [1, 0]],
        ['x', [0, 1]],
        ['o', [1, 1]],
        ['x', [0, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeTruthy();
      expect(game.winner()).toBe('x');
    });
    it(`Should return 'o' when 'o' wins the game`, () => {
      const ScenarioOne = [
        ['o', [0, 0]],
        ['x', [1, 0]],
        ['o', [0, 1]],
        ['x', [1, 1]],
        ['o', [0, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeTruthy();
      expect(game.winner()).toBe('o');
    });
    it(`Should return null when the game is a draw`, () => {
      const ScenarioOne = [
        ['o', [0, 0]],
        ['x', [1, 0]],
        ['o', [0, 1]],
        ['x', [1, 1]],
        ['o', [1, 2]],
        ['x', [0, 2]],
        ['o', [2, 0]],
        ['x', [2, 1]],
        ['o', [2, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeTruthy();
      expect(game.winner()).toBeNull();
    });
    it(`Should return null when the game incomplete`, () => {
      const ScenarioOne = [
        ['o', [0, 0]],
        ['x', [1, 0]],
        ['o', [0, 1]],
        ['x', [1, 1]],
        ['o', [1, 2]],
        ['x', [0, 2]],
        ['o', [2, 0]],
        ['x', [2, 1]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeFalsy();
      expect(game.winner()).toBeNull();
    });
  });
  it('Should have export function that returns an object', () => {
    const game = tictactoe.newGame();
    expect(typeof game.export).toBe('function');
    expect(typeof game.export()).toBe('object');
  });
  describe('export object', () => {
    it('should have four properties', () => {
      const game = tictactoe.newGame();
      const exObj = game.export();
      expect(exObj).toHaveProperty('winner');
      expect(exObj).toHaveProperty('firstPlayer');
      expect(exObj).toHaveProperty('board');
      expect(exObj).toHaveProperty('history');
    });
    describe('winner field', () => {
      it(`Should be 'x' when 'x' wins the game`, () => {
        const ScenarioOne = [
          ['x', [0, 0]],
          ['o', [1, 0]],
          ['x', [0, 1]],
          ['o', [1, 1]],
          ['x', [0, 2]],
        ];
        const game = playbackGame(ScenarioOne);
        expect(game.export().winner).toBe('x');
      });
      it(`Should be 'o' when 'o' wins the game`, () => {
        const ScenarioOne = [
          ['o', [0, 0]],
          ['x', [1, 0]],
          ['o', [0, 1]],
          ['x', [1, 1]],
          ['o', [0, 2]],
        ];
        const game = playbackGame(ScenarioOne);
        expect(game.export().winner).toBe('o');
      });
      it(`Should be null when the game is a draw`, () => {
        const ScenarioOne = [
          ['o', [0, 0]],
          ['x', [1, 0]],
          ['o', [0, 1]],
          ['x', [1, 1]],
          ['o', [1, 2]],
          ['x', [0, 2]],
          ['o', [2, 0]],
          ['x', [2, 1]],
          ['o', [2, 2]],
        ];
        const game = playbackGame(ScenarioOne);
        expect(game.export().winner).toBeNull();
      });
      it(`Should be null when the game incomplete`, () => {
        const ScenarioOne = [
          ['o', [0, 0]],
          ['x', [1, 0]],
          ['o', [0, 1]],
          ['x', [1, 1]],
          ['o', [1, 2]],
          ['x', [0, 2]],
          ['o', [2, 0]],
          ['x', [2, 1]],
        ];
        const game = playbackGame(ScenarioOne);
        expect(game.export().winner).toBeNull();
      });
    });
    describe('firstPlayer field', () => {
      it(`should be 'x' if 'x' goes first`, () => {
        const ScenarioOne = [['x', [0, 0]]];
        const game = playbackGame(ScenarioOne);
        expect(game.export().firstPlayer).toBe('x');
      });
      it(`should be 'o' if 'o' goes first`, () => {
        const ScenarioOne = [['o', [0, 0]]];
        const game = playbackGame(ScenarioOne);
        expect(game.export().firstPlayer).toBe('o');
      });
      it(`should be null if the game hasn't started`, () => {
        const ScenarioOne = [];
        const game = playbackGame(ScenarioOne);
        expect(game.export().firstPlayer).toBeNull();
      });
    });
    describe('board field', () => {
      it('Should return a two-dimensional 3x3 array', () => {
        const ScenarioOne = [
          ['x', [0, 0]],
          ['o', [1, 0]],
          ['x', [0, 1]],
          ['o', [1, 1]],
        ];
        const game = playbackGame(ScenarioOne);
        const board = game.export().board;
        expect(Array.isArray(board)).toBeTruthy();
        expect(board).toHaveLength(3);
        board.forEach((row) => {
          expect(Array.isArray(row)).toBeTruthy();
          expect(row).toHaveLength(3);
        });
      });
      it(`Should only contain the values 'x', 'o' or null`, () => {
        const ScenarioOne = [
          ['x', [0, 0]],
          ['o', [1, 0]],
          ['x', [0, 1]],
          ['o', [1, 1]],
        ];
        const game = playbackGame(ScenarioOne);
        const board = game.export().board;
        board.forEach((row) => {
          row.forEach((value) => {
            expect(['x', 'o', null].includes(value)).toBeTruthy();
          });
        });
      });
    });
    describe('history field', () => {
      it('should be an array of pairs representing a player and position', () => {
        const ScenarioOne = [
          ['x', [0, 0]],
          ['o', [1, 0]],
          ['x', [0, 1]],
          ['o', [1, 1]],
          ['x', [0, 2]],
        ];
        const game = playbackGame(ScenarioOne);
        const history = game.export().history;
        expect(Array.isArray(history)).toBeTruthy();
        history.forEach((move) => {
          expect(Array.isArray(move)).toBeTruthy();
          expect(move).toHaveLength(2);
          const [player, position] = move;
          expect(['x', 'o'].includes(player)).toBeTruthy();
          expect(Array.isArray(position)).toBeTruthy();
          expect(position).toHaveLength(2);
          const [row, col] = position;
          expect(typeof row).toBe('number');
          expect(typeof col).toBe('number');
        });
      });
      it('should match the moves input for the game', () => {
        const ScenarioOne = [
          ['x', [0, 0]],
          ['o', [1, 0]],
          ['x', [0, 1]],
          ['o', [1, 1]],
          ['x', [0, 2]],
        ];
        const game = playbackGame(ScenarioOne);
        const history = game.export().history;
        expect(history).toHaveLength(ScenarioOne.length);
        ScenarioOne.forEach(([player, [row, col]], index) => {
          const [histPlayer, [histRow, histCol]] = history[index];
          expect(player).toMatch(histPlayer);
          expect(row).toBe(histRow);
          expect(col).toBe(histCol);
        });
      });
    });
  });
  describe('Bug checks', () => {
    it(`Issue #7 - Game does not end in certain scenarios`, () => {
      const ScenarioOne = [
        ['x', [0, 1]],
        ['o', [0, 0]],
        ['x', [0, 2]],
        ['o', [1, 0]],
        ['x', [1, 2]],
        ['o', [1, 1]],
        ['x', [2, 0]],
        ['o', [2, 2]],
      ];
      const game = playbackGame(ScenarioOne);
      expect(game.isOver()).toBeTruthy();
      expect(game.winner()).toBe('o');
    });
  });
});
