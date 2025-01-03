import {processUserInput} from "../../UserInput.js";
import {Grid, Block} from "./Grid.js";

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
let [x,y] = [0,0];

export class SnakeEntity {

    constructor(grid) {
        this.grid = grid;
        this.direction = 0;
        this.body = Array(1).fill(() => new Block(0,0));
        this.body[0] = this.grid.getRandomBlock();

        console.log("Snake body: ", this.toStringSnake());
        this.initMoveListener();
        this.actions = new Map([
            [1, this.getBlockAbove.bind(this)], // up  y-=
            [2, this.getBlockRight.bind(this)], // right   x+=
            [3, this.getBlockDown.bind(this)], // down    y+=
            [4, this.getBlockLeft.bind(this)] // left     x-=
        ]);
    }

    // ----------------- Action Functions -----------------
    getBlockAbove() {
        [x,y] = [ this.body[0].x, this.body[0].y - 1 ];
        return this.move();
    }
    getBlockRight() {
        [x,y] = [ this.body[0].x + 1, this.body[0].y ];
        return this.move();
    }
    getBlockDown() {
        [x,y] = [ this.body[0].x, this.body[0].y + 1];
        return this.move();
    }
    getBlockLeft() {
        [x,y] = [ this.body[0].x - 1, this.body[0].y ];
        return this.move();
    }

    // ----------------- updates -----------------
    updatePos() {
        let action = this.actions.get(this.direction);
        if (action) {
            action();
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

    move() {
        let newBlock = this.grid.getSpecificBlock([x, y]);
        console.log("newblock:"+newBlock);

        if (newBlock == null) {
            return null;
        }

        this.setNewHead(newBlock);
    }

    setNewHead(block){
        this.body.unshift(block);
        console.log("Snake body: ", this.toStringSnake());
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
        for (let block of this.body) {
            str += block.toString();
        }
        return str;
    }
}
