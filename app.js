const fs = require('fs');

const Solver = require('./src/solver.js');


const [,, ...args] = process.argv;

const filename = args[0];

if (typeof filename !== 'undefined') {
    const maze = fs.readFileSync(filename, "utf8");
    const solver = new Solver();
    solver.parseText(maze);
    solver.run();
    
    solver.path.forEach((value, index) => {
        if(index == 0) {
            console.log(`Start at column ${value._data[1] +1}, row ${value._data[0] + 1}`)
        } else if (index === solver.path.length -1) {
            console.log(`then end at at column ${value._data[1] + 1}, row ${value._data[0] + 1}`)
        } else {
            console.log(`then go to column ${value._data[1] + 1}, row ${value._data[0] + 1}`)
        }
        
    });
}