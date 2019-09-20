const fs = require('fs');

const Solver = require('./src/solver.js');


const [,, ...args] = process.argv;

const filename = args[0];

if (typeof filename !== 'undefined') {
    const maze = fs.readFileSync(filename, "utf8");
    const solver = new Solver();
    solver.parseText(maze);
    solver.run();
    console.log(solver.path);
}