import {SnakeEntity} from "./SnakeEntity.js";
import {Block, Grid, Grid_Consts} from "./Grid.js";

export class State {

    constructor(board) {
        this.grid = new Grid(); // TODO: update state to utilize and manage grid instance
        this.snake = new SnakeEntity(this.grid);
        console.log("snake: ", this.snake);
        this.food = this.grid.getRandomBlock();
        console.log("food: ", this.food);
        this.board = board;
    }

    update() {
        this.snake.updatePos();

        let isFoodEaten = this.isFoodEaten();
        if (isFoodEaten) {
            this.food = this.grid.getRandomBlock();
        }

        this.snake.updateBody(isFoodEaten);

        if (this.hasCollided()) {
            this.gameOver();
        }
    }

    // ------ snake movement logic -----

    isFoodEaten() {
        return
    }

    isXOrYHit(x, y) {
        const index = this.snake.body.findIndex((part) => {
            return part[0] === x  || part[1] === y;
        });
        return index !== -1;
    }

    hasCollided() {
        return this.hasCollidedWithWall()
            || this.hasCollidedWithItself();
    }

    hasCollidedWithWall() {

        let head = new Block(0,0);
        head = this.snake.body[0];

        if (head === undefined) {
            console.log("head is undefined");
            return false;
        }

        // Check if the snake is out of bounds
        if (head.x < 0 || head.x > Grid_Consts.CANVAS_WIDTH ||
            head.y < 0 || head.y >= Grid_Consts.CANVAS_HEIGHT) {
            this.gameOver("Game over! You collided with the wall!");
            return true;
        }
        return false;
    }

    hasCollidedWithItself() {
        const body = this.snake.body;
        // Check if the snake collides with itself
        for (let i = 1; i < body.length; i++) {
            if (body[0][0] === body[i][0] && body[0][1] === body[i][1]) {
                this.gameOver("Game over! You collided with yourself!");
                return true;
            }
        }
        return false;
    }

    // ----------------- Food logic -----------------



    // ----------------- Game Over logic -----------------
    gameOver(message) {
        if (sessionStorage.getItem("gameOver") === "true") {
            return true;
        }
        sessionStorage.setItem("gameOver", "true");

        alert(message);

        console.log(`game over, snake position: (${this.snake.body[0][0]}, ${this.snake.body[0][1]}), board: (${this.board.width}, ${this.board.height})`);
        return false;
    }
}