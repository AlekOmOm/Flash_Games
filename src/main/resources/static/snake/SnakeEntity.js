import {processUserInput} from "../UserInput.js";
import {getRandomPoint} from "./SnakeGame.js";

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
    body;
    direction;
    action;

    constructor() {
        this.initSnakeBody();
        this.initMoveListener();
        this.actions = new Map([
            [1, () => { this.snakeY -= this.BLOCKSIZE; }], // up
            [2, () => { this.snakeX += this.BLOCKSIZE; }], // right
            [3, () => { this.snakeY += this.BLOCKSIZE; }], // down
            [4, () => { this.snakeX -= this.BLOCKSIZE; }], // left
        ]);
    }

    initSnakeBody() {
        this.body.push([getRandomPoint(), getRandomPoint()]);
    }

    // ----------------- updates -----------------

    updatePos() {
        this.action = this.actions.get(this.direction);
        if (this.action) this.action();
    }

    updateBody(hasFoodBeenEaten) {
        if (!hasFoodBeenEaten){
            return this.body.pop();
        }
    }

    // ----------------- Movement -----------------


    initMoveListener() {
        document.addEventListener("keydown", function (event) {
            this.setDirection(processUserInput(event, DIRECTION_KEY_MAPPING));
        });
    }

    // ----------------- Direction -----------------

    setDirection(newDirection) {
        if (direction === newDirection ) {
            return;
        }

        if (this.isOppositeDirection(newDirection)) {
            return;
        }

        direction = newDirection;
    }

    isOppositeDirection(nr) {
        let check = direction + nr;

        return check === 4 || check === 6;
    }

    // --- helper methods ---
    toStringSnake() {
        let str = "";
        for (let i = 0; i < this.snake.length; i++) {
            str += "(" + this.snake[i][0] + "," + this.snake[i][1] + ")";
        }
        return str;
    }

}
