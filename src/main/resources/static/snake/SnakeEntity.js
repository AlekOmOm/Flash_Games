import {processUserInput} from "../UserInput.js";
import {getRandomPoint} from "./SnakeGame.js";



// ----------------- main operations -----------------

export class SnakeEntity {
    snake = [];

    snakeX = getRandomPoint();
    snakeY = getRandomPoint();
    body = [];
    direction = 0;

    constructor() {
        this.body = [];
        this.body.push([this.snakeX, this.snakeY]);

        this.initializeMovement();
    }


    // ----------------- main -----------------

    load(food) { // TODO food interaction
        updatePos(direction);
        return update(food);
    }

    // ----------------- updates -----------------

    update(food) {
        if (this.body.length === 0) {
            this.body.push([getRandomPoint(),getRandomPoint()]);
        }

        let snake_updated = [];
        snake_updated.push([this.snakeX,this.snakeY]); // push head first

        for (let i = 0; i<this.body.length; i++) {
            snake_updated.push(this.body[i]);
        }

        if (!(food.isFoodedEaten())) {
            snake_updated.pop();
        }

        this.snake = snake_updated;
        return this.snake;
    }

    updatePos(dirNr) {
        if (dirNr === 1) { // up
            snakeY-=BLOCKSIZE;
        } else if (dirNr === 2) { // right
            snakeX+=BLOCKSIZE;
        } else if (dirNr === 3) { // down
            snakeY+=BLOCKSIZE;
        } else if (dirNr === 4) { // left
            snakeX-=BLOCKSIZE;
        }
    }



    // ----------------- Movement -----------------
    initializeMovement(){
        document.addEventListener("keydown", function (event) {
            setDirection(processUserInput(event, {
                "ArrowUp": 1,
                "ArrowRight": 2,
                "ArrowDown": 3,
                "ArrowLeft": 4,
                "w": 1,
                "d": 2,
                "s": 3,
                "a": 4
            }));
        });
    }

    // ----------------- Direction -----------------

    setDirection(nr) {
        if (direction === nr ) {
            return;
        }

        if (oppositeDirection(nr)) {
            return;
        }

        direction = nr;
    }

    oppositeDirection(nr) {
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
