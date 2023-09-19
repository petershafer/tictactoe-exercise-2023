const { Grid, Grid3x3 } = require('./grid');

describe('Grid Class', () => {
  it('Should create a grid instance', () => {
    const myGrid = new Grid(3, 3);
    expect(myGrid).toBeInstanceOf(Grid);
  });
  it('Should not allow invalid arguments in constructor', () => {
    expect(() => new Grid()).toThrow('Invalid grid dimensions');
    expect(() => new Grid(1)).toThrow('Invalid grid dimensions');
    expect(() => new Grid(1, '2')).toThrow('Invalid grid dimensions');
    expect(() => new Grid(null, null)).toThrow('Invalid grid dimensions');
    expect(() => new Grid(-1, -1)).toThrow('Invalid grid dimensions');
  });
  describe('setPosition()', () => {
    it('should set the value at the given coordinates', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setPosition([0, 0], 'x');
      expect(myGrid.getPosition([0, 0])).toBe('x');
      expect(myGrid.getIndex(0)).toBe('x');
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.setPosition([-1, -1], 'x')).toThrow(
        'Invalid grid position'
      );
      expect(() => myGrid.setPosition([0], 'x')).toThrow(
        'Invalid grid position'
      );
      expect(() => myGrid.setPosition([3, 3], 'x')).toThrow(
        'Invalid grid position'
      );
    });
  });
  describe('getPosition()', () => {
    it('should get the value at the given coordinates', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setPosition([0, 0], 'x');
      expect(myGrid.getPosition([0, 0])).toBe('x');
    });
    it('should not get values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.getPosition([-1, -1])).toThrow(
        'Invalid grid position'
      );
      expect(() => myGrid.getPosition([0])).toThrow('Invalid grid position');
      expect(() => myGrid.getPosition([3, 3])).toThrow('Invalid grid position');
    });
  });
  describe('getRow()', () => {
    it('should get the values for the given row', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setRow(0, [1, 2, 3]);
      expect(myGrid.getRow(0)).toEqual([1, 2, 3]);
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.getRow(-1)).toThrow('Invalid grid row');
      expect(() => myGrid.getRow('0')).toThrow('Invalid grid row');
      expect(() => myGrid.getRow(3)).toThrow('Invalid grid row');
    });
  });
  describe('setRow()', () => {
    it('should set the values for the given row', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setRow(0, [1, 2, 3]);
      expect(myGrid.getRow(0)).toEqual([1, 2, 3]);
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.setRow(-1)).toThrow('Invalid grid row');
      expect(() => myGrid.setRow('0')).toThrow('Invalid grid row');
      expect(() => myGrid.setRow(3)).toThrow('Invalid grid row');
    });
  });
  describe('getRows()', () => {
    it('should get all values by row', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setRow(0, [1, 2, 3]);
      myGrid.setRow(1, [4, 5, 6]);
      myGrid.setRow(2, [7, 8, 9]);
      expect(myGrid.getRows()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });
  describe('getColumn()', () => {
    it('should get the values for the given column', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setColumn(0, [1, 2, 3]);
      expect(myGrid.getColumn(0)).toEqual([1, 2, 3]);
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.getColumn(-1)).toThrow('Invalid grid column');
      expect(() => myGrid.getColumn('0')).toThrow('Invalid grid column');
      expect(() => myGrid.getColumn(3)).toThrow('Invalid grid column');
    });
  });
  describe('setColumn()', () => {
    it('should set the values for the given column', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setColumn(0, [1, 2, 3]);
      expect(myGrid.getColumn(0)).toEqual([1, 2, 3]);
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.setColumn(-1)).toThrow('Invalid grid column');
      expect(() => myGrid.setColumn('0')).toThrow('Invalid grid column');
      expect(() => myGrid.setColumn(3)).toThrow('Invalid grid column');
    });
  });
  describe('getColumns()', () => {
    it('should get all values by column', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setColumn(0, [1, 2, 3]);
      myGrid.setColumn(1, [4, 5, 6]);
      myGrid.setColumn(2, [7, 8, 9]);
      expect(myGrid.getColumns()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });

  describe('setIndex()', () => {
    it('should set the value at the given index', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setIndex(0, 'x');
      expect(myGrid.getPosition([0, 0])).toBe('x');
      expect(myGrid.getIndex(0)).toBe('x');
    });
    it('should not set values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.setIndex(-1, 'x')).toThrow('Invalid grid index');
      expect(() => myGrid.setIndex('0', 'x')).toThrow('Invalid grid index');
      expect(() => myGrid.setIndex(9, 'x')).toThrow('Invalid grid index');
    });
  });
  describe('getIndex()', () => {
    it('should get the value at the given index', () => {
      const myGrid = new Grid(3, 3);
      myGrid.setPosition([0, 0], 'x');
      expect(myGrid.getPosition([0, 0])).toBe('x');
    });
    it('should not get values outside of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(() => myGrid.getIndex(-1)).toThrow('Invalid grid index');
      expect(() => myGrid.getIndex('0')).toThrow('Invalid grid index');
    });
  });
  describe('fill()', () => {
    it('should fill the grid with the given value', () => {
      const myGrid = new Grid(3, 3);
      myGrid.fill('x');
      expect(myGrid.getRows()).toEqual([
        ['x', 'x', 'x'],
        ['x', 'x', 'x'],
        ['x', 'x', 'x'],
      ]);
    });
  });
  describe('info()', () => {
    it('should provide the dimensions of the grid', () => {
      const myGrid = new Grid(3, 3);
      expect(myGrid.info()).toEqual({
        rows: 3,
        columns: 3,
      });
    });
  });
  describe('exportGrid()', () => {
    const myGrid = new Grid(3, 3);
    myGrid.setRow(0, [1, 2, 3]);
    myGrid.setRow(1, [4, 5, 6]);
    myGrid.setRow(2, [7, 8, 9]);
    expect(myGrid.exportGrid()).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
  describe('importGrid()', () => {
    const myGrid = new Grid(3, 3);
    myGrid.importGrid([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(myGrid.exportGrid()).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
  describe('exportValues()', () => {
    const myGrid = new Grid(3, 3);
    myGrid.setRow(0, [1, 2, 3]);
    myGrid.setRow(1, [4, 5, 6]);
    myGrid.setRow(2, [7, 8, 9]);
    expect(myGrid.exportValues()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  describe('importValues()', () => {
    const myGrid = new Grid(3, 3);
    myGrid.importValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log(myGrid.exportGrid());
    expect(myGrid.exportGrid()).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});

describe('Grid3x3 Class', () => {
  const myGrid = new Grid3x3();
  myGrid.fill('x');
  expect(myGrid.info()).toEqual({
    rows: 3,
    columns: 3,
  });
  expect(myGrid.exportGrid()).toEqual([
    ['x', 'x', 'x'],
    ['x', 'x', 'x'],
    ['x', 'x', 'x'],
  ]);
});
