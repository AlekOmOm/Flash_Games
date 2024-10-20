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

export function loadSnake() {
    updateSnakeXY(direction);
    updateSnake();
}

// ----------------- Snake -----------------
export function updateSnake() {
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

    snake = snake_updated;
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

export function getSnake() {
    return snake;
}

// ----------------- Direction -----------------
export function setDirection(nr) {
    if (direction === nr ) {
        return;
    }

    if (oppositeDirection(nr)) {
        return;
    }

    console.log(" ");
    console.log("change of direction: " + direction + " -> " + nr);
    console.log(" - from: " + getMovement(direction) + " -> " + getMovement(nr));

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
    return Math.floor(Math.random() * BOARD_HEIGHT) * BLOCKSIZE;
}


function getMovement(nr) {
    let dirMovement = "";
    if (nr === 1) {
        dirMovement = "up";
    } else if (nr === 2) {
        dirMovement = "right";
    } else if (nr === 3) {
        dirMovement = "down";
    } else if (nr === 4) {
        dirMovement = "left";
    }
    return dirMovement;
}
