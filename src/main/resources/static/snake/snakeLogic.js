import {processUserInput} from "../userInput.js";


export var snakeX = 20*20;
export var snakeY = 20*20;
var foodX, foodY;

export let snake, direction, BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH;



// ----------------- main operations -----------------

export function initializeSnake(blocksizePrm, board_heightPrm, board_widthPrm) {
    BLOCKSIZE = blocksizePrm;
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
        snakeY-=BLOCKSIZE;
    } else if (dirNr === 2) { // right
        snakeX+=BLOCKSIZE;
    } else if (dirNr === 3) { // down
        snakeY+=BLOCKSIZE;
    } else if (dirNr === 4) { // left
        snakeX-=BLOCKSIZE;
    }
}

// ----------------- Direction -----------------
export function setDirection(input) {
    nr = convert(input);

    if (direction === nr ) {
        return;
    }

    if (oppositeDirection(nr)) {
        return;
    }

    direction = nr;
}

function convert(input) {
    let nr = 0;
    // check for char or int (wasd or arrow keys)
    if (typeof input === "string") {
        if (input === "w") {
            nr = 1;
        } else if (input === "d") {
            nr = 2;
        } else if (input === "s") {
            nr = 3;
        } else if (input === "a") {
            nr = 4;
        }
    } else {
        nr = input;
    }
    return nr;
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
    return Math.floor(Math.random() * BOARD_HEIGHT) * BLOCKSIZE;
}
