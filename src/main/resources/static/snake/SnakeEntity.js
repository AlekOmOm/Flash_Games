import {processUserInput} from "../UserInput.js";
import {Grid, getRandomBlock} from "./SnakeGame.js";

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

    constructor() {
        this.direction = 0;
        this.initSnakeBody();
        this.initMoveListener();
        this.actions = new Map([
            [1, () => {  return [this.body[0][0], this.body[0][1] - Grid.BLOCKSIZE]; }], // up
            [2, () => {  return [this.body[0][0] + Grid.BLOCKSIZE, this.body[0][1]]; }], // right
            [3, () => {  return [this.body[0][0], this.body[0][1] + Grid.BLOCKSIZE]; }], // down
            [4, () => {  return [this.body[0][0] - Grid.BLOCKSIZE, this.body[0][1]]; }] // left
        ]);
    }


    initSnakeBody() {
        this.body = [
            [(getRandomBlock(), getRandomBlock())]
        ];
    }

// ----------------- updates -----------------

    updatePos() {
        let action = this.actions.get(this.direction);
        if (action) {
            let newHead = action();
            this.body.unshift(newHead); // add 'newHead' at index 0
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
