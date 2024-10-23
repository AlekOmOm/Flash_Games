import {processUserInput} from "../UserInput.js";
import {Grid} from "./Grid.js";

const DIRECTION_KEY_MAPPING = {
    "ArrowUp": 1,
    "ArrowRight": 2,
    "ArrowDown": 3,
    "ArrowLeft": 4,
    "w": 1,
    "d": 2,
    "s": 3,
    "a": 4
};

// ----------------- main operations -----------------

export class SnakeEntity {

    constructor(block) {
        this.direction = 0;
        this.body = [block];
        this.initMoveListener();
        this.actions = new Map([
            [1, (grid) => this.getBlockAbove(grid)], // up  y-=
            [2, (grid) => this.getBlockRight(grid)], // right   x+=
            [3, (grid) => this.getBlockDown(grid)], // down    y+=
            [4, (grid) => this.getBlockLeft(grid)] // left     x-=
        ]);
    }

    // ----------------- Action Functions -----------------
    getBlockAbove(grid) {
        let [x,y] = [ this.body[0].x, this.body[0].y - 1 ];
        this.move(grid, x, y);
    }
    getBlockRight(grid) {
        let [x,y] = [ this.body[0].x + 1, this.body[0].y ];
        this.move(grid, x, y);
    }
    getBlockDown(grid) {
        let [x,y] = [ this.body[0].x, this.body[0].y + 1];
        this.move(grid, x, y);
    }
    getBlockLeft(grid) {
        let [x,y] = [ this.body[0].x - 1, this.body[0].y ];
        this.move(grid, x, y);
    }

    // ----------------- updates -----------------
    updatePos(grid) {
        let action = this.actions.get(this.direction);

        if (action) {
            action(grid);
        }
    }

    updateBody(hasFoodBeenEaten) {
        if (!hasFoodBeenEaten) {
            this.body.pop();
        }
    }

    // ----------------- Movement -----------------
    initMoveListener() {
        document.addEventListener("keydown", (event) => {
            this.setDirection(processUserInput(event, DIRECTION_KEY_MAPPING));
        });
    }

    move(grid, x, y) {
        let newBlock = grid.getSpecificBlock([x, y]);
        if (newBlock != null) {
            this.setNewHead(newBlock);
            return
        }
        return [x,y];
    }

    setNewHead(block){
        this.body.unshift(block);
    }

    // ----------------- Direction -----------------

    setDirection(newDirection) {
        if (this.direction === newDirection ) {
            return;
        }

        if (this.isOppositeDirection(newDirection)) {
            return;
        }

        this.direction = newDirection;
        console.log("Snake direction: ", this.direction);
    }

    isOppositeDirection(nr) {
        let check = this.direction + nr;

        return check === 4 || check === 6;
    }

    // --- helper methods ---
    toStringSnake() {
        let str = "";
        for (let i = 0; i < this.body.length; i++) {
            str += "(" + this.body[i][0] + "," + this.body[i][1] + ")";
        }
        return str;
    }
}
