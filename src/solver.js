const mathjs = require('mathjs');

class Solver {
    
    constructor () {
        this.junctions = [];
    }

    getPossiblePositions () {
        const movements = [
            [mathjs.matrix([0, -1]), '<'],
            [mathjs.matrix([0, 1]), '>'],
            [mathjs.matrix([-1, 0]), '^'],
            [mathjs.matrix([1, 0]), 'v']
        ];
        const currentPoint = this.path[this.path.length -1];
        return movements.map((movement) => {
            const [vector, direction] = movement;
            return mathjs.add(vector, currentPoint);
        });
    };

    filterVoidPositions (posPositions) {
        const filtered = [];
        posPositions.forEach((position) => {
            try {
                const value = this.matrix.get(position._data);
                const lastButOne = this.path[this.path.length - 2];
                if (lastButOne && mathjs.deepEqual(position, lastButOne)) {
                    return;
                }
                if (value === 0) {
                    filtered.push(position);
                }
            } catch(error) {

            }finally {

            }
        });
        return filtered;
    }

    resetToLastJunctionIfRequired (posPositions) {
        
        if (posPositions.length === 0) {
            if (this.junctions.length === 0) {
                throw new Error('No junctions left to try, maze unsolvable');
            }
            const lastJunctionIndex = this.junctions.pop();
            const badPath = this.path.slice(lastJunctionIndex + 1);
            const matrix = this.matrix;
            badPath.forEach((item) => {
                matrix.set(item._data, 1);
            });
            this.matrix = matrix;
            this.path = this.path.slice(0, lastJunctionIndex + 1);
            return true;
        }
    }

    checkIfJunction (posPositions) {
        if (posPositions.length >= 2) {
            this.junctions.push(this.path.length -1);
        }
    }

    scoreAndPickBestPath (posPositions) {
        return posPositions[0];
    }

    run (turns = 1000000) {
        for (let turn =0; turn < turns; turn++) {
            if (mathjs.deepEqual(this.path[this.path.length - 1], this.endPoint)) {
                return this.path;
            }
            const posPositions = this.filterVoidPositions(this.getPossiblePositions());
            if (this.resetToLastJunctionIfRequired(posPositions)) {
                continue;
            }
            this.checkIfJunction(posPositions);
            const next = this.scoreAndPickBestPath(posPositions);
            this.path.push(next);
        }            
    }


    parseText (mazeText) {
        const rows = mazeText.split('\n');
        const arrays = rows.map((item) => Array(...item));
        this.matrix = mathjs.matrix(arrays);
        this.matrix.forEach((value, index, m) => {
            if (value === 'S') {
                this.path = [mathjs.matrix(index)];
            }
            if (value === 'O' && !this.endPoint) {
                m._size.forEach((dim, indexInIndex) => {
                    const currentIndex = index[indexInIndex]
                    if (currentIndex === 0 || currentIndex === dim -1) {
                        this.endPoint = mathjs.matrix(index);
                    }
                });
            }
            
        });
    }
} 

module.exports = Solver; 