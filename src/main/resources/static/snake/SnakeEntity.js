import {processUserInput} from "../UserInput.js";
import {getRandomPoint, setFoodPoint, foodIsEaten} from "./food.js";

export let snake, direction, BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH;



// get

export function getSnake(){
    this.load();
    return this.snake;
}

// ----------------- main operations -----------------

export class SnakeEntity {

    snake = [];
    userInput;
    snakeX = this.getRandomPoint();
    snakeY = this.getRandomPoint();
    body = [];
    direction = 0;

    constructor() {
        this.body = [];
        this.body.push([snakeX, snakeY]);
        this.userInput = new UserInput();
        this.initializeMovement();
    }

    // ----------------- main -----------------

    load() {
        updatePos(direction);
        update();
    }

    // ----------------- updates -----------------

    update() {
        if (this.body.length === 0) {
            this.body.push([getRandomPoint(),getRandomPoint()]);
        }

        let snake_updated = [];
        snake_updated.push([snakeX,snakeY]); // push head first

        for (let i = 0; i<this.body.length; i++) {
            snake_updated.push(this.body[i]);
        }

        if (!foodIsEaten()) {
            snake_updated.pop();
        }

        this.snake = snake_updated;
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

    getRandomPoint() {
        // get rounded random number between 0 and BOARD_HEIGHT
        return Math.floor(Math.random() * this.board.height).toFixed(0);
    }
}



// ----------------- Snake -----------------





