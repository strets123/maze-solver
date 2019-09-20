const mathjs = require('mathjs');

const Solver = require('../solver');

let testMatrix = null;

const m = mathjs.matrix;

let posPositions = null;

beforeEach(() => {
    const sol = new Solver();
    
    sol.path = [
        m([2,1]),
        m([1,1]),
        m([1,2]),
        m([1,3])
    ];
    sol.matrix = m([
        [1,0,1,1,1],
        [1,0,0,0,1],
        [1,0,1,1,1],
        [1,1,1,1,1]
    ]);
    sol.endPoint = m([0,1]);
    posPositions = [
        m([1,4]),
        m([2,3]),
        m([1,2]),
        m([0,3])
    ];
    sol.junctions = [1];
    testMatrix = sol;
});

test('test maze content can be parsed', () => {
    const sol = new Solver();
    sol.parseText('XS\nXO');
    expect(sol.matrix._data).toEqual([ [ 1, 0 ], [ 1, 0 ] ]);
});

test('windows line feeds', () => {
    const sol = new Solver();
    sol.parseText('XS\r\nXO');
    expect(sol.matrix._data).toEqual([ [ 1, 0 ], [ 1, 0 ] ]);
});

test('trailing line', () => {
    const sol = new Solver();
    sol.parseText('XS\nXO\n');
    expect(sol.matrix._data).toEqual([ [ 1, 0 ], [ 1, 0 ] ]);
});

test('whitespace before line', () => {
    const sol = new Solver();
    sol.parseText('XS\n\tXO\n');
    expect(sol.matrix._data).toEqual([ [ 1, 0 ], [ 1, 0 ] ]);
});

test('larger Maze', () => {
    const sol = new Solver();
    sol.parseText('XOXXXX\nXOXOOX\nXOXOXX\nXOOOSX\nXXXXXX');
    expect(sol.endPoint).toEqual(m([0,1]));
});

test('possible positions', () => {
    const sol = new Solver();
    const m = mathjs.matrix;
    sol.path = [m([1,1])];
    const expected = [m([1,0]), m([1,2]), m([0,1]), m([2, 1])];
    expect(sol.getPossiblePositions()).toEqual(
        expected
    );
});

test('filterPositions', () => {
    const sol = new Solver();
    const m = mathjs.matrix;
    sol.path = [m([0,1])];
    sol.matrix = m([
        [ 1, 0 ],
        [ 1, 0 ] 
    ]);
    const positions = [m([0,0]), m([0,2]), m([-1,1]), m([1,1])];
    expect(sol.filterVoidPositions(positions)).toEqual([m([1,1])]);
});

test('filterVoidPositions does not turn back and blocks bad route', () => {
    expect(testMatrix.filterVoidPositions(posPositions)).toEqual([]);
});

test('resetToLastJunctionIfRequired', () => {
    
    testMatrix.resetToLastJunctionIfRequired([]);
    expect(testMatrix.path).toEqual(
        [
            m([2,1]),
            m([1,1]),
        ]
    );

    expect(testMatrix.matrix._data).toEqual(
        [
            [1,0,1,1,1],
            [1,0,1,1,1],
            [1,0,1,1,1],
            [1,1,1,1,1]
        ]
    );
    
});

test('checkIfJunction sends junction pointer', () => {
    const sol = new Solver();
    sol.matrix = testMatrix.matrix;
    sol.path = testMatrix.path.splice(0,2);
    sol.junctions = [];
    sol.checkIfJunction(['some', 'array']);
    expect(sol.junctions).toEqual([1]);
});

test('scoreAndPickBestPath just picks first for now', () => {
    expect(testMatrix.scoreAndPickBestPath(['foo', 'bar'])).toEqual('foo');
});

test('run solves the maze', () => {
    testMatrix.run(10);
    const exp1 = m([2,1]);
    expect(testMatrix.path).toEqual([
        m([2,1]),
        m([1,1]),
        m([0,1])
    ]);
});

test('throws exception for unsolvable maze', () => {
    const sol = new Solver();
    sol.matrix = m([
        [1,0,1,1,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,1,1,1],
        [1,1,1,1,1]
    ]);
    sol.path = [
        m([3,1]),
    ];
    sol.endPoint = m([0,1]);
    expect(sol.run).toThrow(Error);
});

test('does not get stuck if maze is loopy', () => {
    const sol = new Solver();
    sol.matrix = m([
        [1,0,1,1,1],
        [1,0,0,0,1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1]
    ]);
    sol.path = [
        m([5,3]),
    ];
    sol.endPoint = m([0,1]);
    sol.run();
})
