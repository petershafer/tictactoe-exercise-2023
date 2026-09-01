const index = require('../src/index');

describe('index entry point', () => {
  it('Should export the tictactoe package name', () => {
    expect(index.PACKAGE_NAME).toBe('tictactoe');
  });

  it('Should re-export newGame as a function', () => {
    expect(typeof index.newGame).toBe('function');
  });

  it('Should re-export Grid3x3 as a class', () => {
    expect(typeof index.Grid3x3).toBe('function');
    expect(new index.Grid3x3()).toBeInstanceOf(index.Grid3x3);
  });
});
