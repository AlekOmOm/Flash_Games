import {processUserInput} from "../userInput.js";


export var snakeX = 20*20;
export var snakeY = 20*20;
var foodX, foodY;

export let snake, direction, blocksize, BOARD_HEIGHT, BOARD_WIDTH;



// ----------------- main operations -----------------

export function initializeSnake(blocksizePrm, board_heightPrm, board_widthPrm) {
    document.addEventListener("keyup", function (event) {
        setDirection(processUserInput(event, {
            "ArrowUp": 1,
            "ArrowRight": 2,
            "ArrowDown": 3,
            "ArrowLeft": 4
        }));
    });
    blocksize = blocksizePrm;
    BOARD_HEIGHT = board_heightPrm;
    BOARD_WIDTH = board_widthPrm;

    snake = [];
    snake.push([snakeX, snakeY]);

    setFoodPoint();
}

export function load(snake) {
    updateSnakeXY(direction);
    return updateSnake(snake);
}

// ----------------- Snake -----------------
export function updateSnake(snake) {
    if (snake.length === 0) {
        snake.push([getRandomPoint(),getRandomPoint()]);
    }

    let snake_updated = [];
    snake_updated.push([snakeX,snakeY]);

    for (let i = 0; i<snake.length; i++) {
        snake_updated.push(snake[i]);
    }

    if (!foodIsEaten()) {
        snake_updated.pop();
    }

    return snake_updated;
}

export function updateSnakeXY(dirNr) {
    if (dirNr === 1) { // up
        snakeY-=blocksize;
    } else if (dirNr === 2) { // right
        snakeX+=blocksize;
    } else if (dirNr === 3) { // down
        snakeY+=blocksize;
    } else if (dirNr === 4) { // left
        snakeX-=blocksize;
    }
}

// ----------------- Direction -----------------
export function setDirection(nr) {
    if (direction === nr ) {
        return;
    }

    if (oppositeDirection(nr)) {
        return;
    }

    direction = nr;
}

export function oppositeDirection(nr) {
    let check = direction + nr;

    return check === 4 || check === 6;
}

// ----------------- Food -----------------
export function getFoodPoint() {
    if (foodIsEaten()) {
        setFoodPoint();
    }
    return [foodX, foodY];
}
export function setFoodPoint() {
    do {
        foodX = getRandomPoint();
        foodY = getRandomPoint();
    } while (snake.some(segment => segment[0] === foodX && segment[1] === foodY));
}

export function foodIsEaten() {
    return snakeX === foodX && snakeY === foodY;
}


function getRandomPoint() {
    return Math.floor(Math.random() * BOARD_HEIGHT) * blocksize;
}
