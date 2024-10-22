import { Board } from "./Board.js";
import {SnakeEntity} from "./SnakeEntity.js";
import {FoodEntity} from "./FoodEntity.js";


export class State {

    constructor(board) {
        this.snake = new SnakeEntity(board);
        this.food = new FoodEntity(this.snake);
        this.board = board;

        console.log("State: ", this);
    }

    update() {
        this.snake.updatePos();
        let isFoodEaten = this.isFoodEaten();
        if (isFoodEaten) {
            this.food.setNewPoint(this.snake.body);
        }
        this.snake.updateBody(isFoodEaten);

        if (this.hasCollided()) {
            this.gameOver();
        }
    }


    // ------ snake movement logic -----

    isFoodEaten() {
        return this.isXYHit(this.food.foodX, this.food.foodY);
    }

    isXYHit(x, y) {
        const index = this.snake.body.findIndex((part) => {
            return part[0] === x  && part[1] === y;
        });
        return index !== -1;
    }

    isXOrYHit(x, y) {
        const index = this.snake.body.findIndex((part) => {
            return part[0] === x  || part[1] === y;
        });
        return index !== -1;
    }

    hasCollided() {
        console.log("hasCollided");
        console.log("snake: ", this.snake);
        return this.hasCollidedWithWall()
            || this.hasCollidedWithItself();
    }

    hasCollidedWithWall() {
        const head = this.snake.body[0];
        // Check if the snake is out of bounds
        if (head[0] < 0 || head[0] >= this.board.canvasEle.width ||
            head[1] < 0 || head[1] >= this.board.canvasEle.height) {
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