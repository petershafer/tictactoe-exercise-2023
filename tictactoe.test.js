const tictactoe = require('./tictactoe');
const { playbackGame } = require('./utils');

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
        
    });
    it('Should have isOver function', () => { 
        const game = tictactoe.newGame();
        expect(typeof game.isOver).toBe('function');
    });
    describe('isOver function', () => {
        it('Should return false when game is not over', () => {
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]]];
            const game = playbackGame(ScenarioOne);
            expect(game.isOver()).toBeFalsy();
        });
        it('Should return true when game is over', () => {
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]], ['x', [0,2]]];
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
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]]];
            const game = playbackGame(ScenarioOne);
            const board = game.getBoard();
            expect(Array.isArray(board)).toBeTruthy();
            expect(board.length).toBe(3);
            board.forEach(row => {
                expect(Array.isArray(row)).toBeTruthy();
                expect(row.length).toBe(3);
            });
        });
        it(`Should only contain the values 'x', 'o' or null`, () => {
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]]];
            const game = playbackGame(ScenarioOne);
            const board = game.getBoard();
            board.forEach(row => {
                row.forEach(value => {
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
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]]];
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
            const ScenarioOne = [['x', [0,0]], ['o', [1,0]], ['x', [0,1]], ['o', [1,1]], ['x', [0,2]]];
            const game = playbackGame(ScenarioOne);
            expect(game.isOver()).toBeTruthy();
            expect(game.winner()).toBe('x');
        });
        it(`Should return 'o' when 'o' wins the game`, () => {
            const ScenarioOne = [['o', [0,0]], ['x', [1,0]], ['o', [0,1]], ['x', [1,1]], ['o', [0,2]]];
            const game = playbackGame(ScenarioOne);
            expect(game.isOver()).toBeTruthy();
            expect(game.winner()).toBe('o');
        });
        it(`Should return null when the game is a draw`, () => {
            const ScenarioOne = [
                ['o', [0,0]], ['x', [1,0]], ['o', [0,1]], ['x', [1,1]], ['o', [1,2]], ['x', [0,2]],
                ['o', [2,0]], ['x', [2,1]], ['o', [2,2]]
            ];
            const game = playbackGame(ScenarioOne);
            expect(game.isOver()).toBeTruthy();
            expect(game.winner()).toBeNull();
        });
        it(`Should return null when the game incomplete`, () => {
            const ScenarioOne = [
                ['o', [0,0]], ['x', [1,0]], ['o', [0,1]], ['x', [1,1]], ['o', [1,2]], ['x', [0,2]],
                ['o', [2,0]], ['x', [2,1]]
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
    });
});
