# Maze solving programme

## Installation

    git clone https://github.com/strets123/maze-solver
    cd maze-solver
    npm i
    
## Running tests

    npm run test

## Running

Run against a file with a maze saved in the following format

    XOXXXX
    XOXOOX
    XOXOXX
    XOOOSX
    XXXXXX

For example:

    npm run solve test.maze

Assumptions:
* There is only one exit at a side wall, the rest of the sides are crosses (walls)
* The starting point is an S

## Output 

Currently we output the maze solution as a set of instructions.
By using a text-based matrix we could output an arrow to show the direction travelled in the maze.

## Proposed improvements

* 3D mazes can e implemented by removing the remaining none-matrix driven code and coming up with a format for a 3D maze (work begun here https://github.com/strets123/maze-solver/pull/1).
* Best path can be found by interating all possible paths and comparing length 
* Better choice of direction can be made by picking which direction gets us closer to the endpoint - a solution needs to be found to ensure that if there is a loop, the shortest path is taken around it.
* Linting could be added to improve code readability.
* Type checking could be added to try to stop errors.
* CI could be added to run the tests and coverage.
* When above is complete htis could be published to npm.