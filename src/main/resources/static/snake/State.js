import { Board } from "./Board.js";
import {SnakeEntity} from "./SnakeEntity.js";
import {Food} from "./Food.js";


export class State {
    snake;
    food;
    board;

    constructor(board) {
        this.snake = new SnakeEntity(board);
        this.food = new Food();
        this.board = board;
    }

    update() {
        this.snake = this.snake.update();
        this.food.load();
    }

    // ------ snake movement logic -----

    hasCollided() {

    }

    isFoodedEaten() {
        this.food.foodIsEaten(this.snake.snakeX, this.snake.snakeY);
    }

    // ----------------- Game Over logic -----------------
    gameOver() {

        let snakeX = this.snake[0][0];
        let snakeY = this.snake[0][1];

        if (sessionStorage.getItem("gameOver") === "true") {
            return true;
        }

        // Check if the snake is out of bounds
        if (snakeX < 0 || snakeY < 0 || snakeX > width || snakeY > height) {
            alert("Game over! You collided with the wall!");
            sessionStorage.setItem("gameOver", "true");
            console.log("game over, snake position: (" + snakeX + "," + snakeY + "), board: (" + width + "," + height + ")");
            return true;
        }

        // Check if the snake collides with itself
        for (let i = 1; i < snake.length; i++) {
            if (snakeX === snake[i][0] && snakeY === snake[i][1]) {
                alert("Game over! You collided with yourself!");
                sessionStorage.setItem("gameOver", "true");
                console.log("game over, snake position: (" + snakeX + "," + snakeY + "), snake: {" + toStringSnake(snake) + "}");

                return true;
            }
        }
        return false;
    }




}