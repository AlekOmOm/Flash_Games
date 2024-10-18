

const blocksize = 20;
const BOARD_WIDTH = 35;
const BOARD_HEIGHT = 35;
var board;
var background;

var snakeX = getRandomPoint();
var snakeY = getRandomPoint();
var oldX;
var oldY;
var snake = [];

var foodX;
var foodY;

var direction; // 1 = up, 2 = right, 3 = down and 4 = left
var highscore = document.getElementById("highscore");

function initializeBoard() {
    board = document.getElementById("board");
    board.height = BOARD_HEIGHT * blocksize;
    board.width = BOARD_WIDTH * blocksize;
    background = board.getContext("2d");

    snake.push([snakeX,snakeY]);
    setFoodPoint();
}

window.onload = function () {
    this.initializeBoard();

    document.addEventListener("keyup", processUserInput);

    loadFrame();

    setInterval(loadFrame, 1000/10);
}

function processUserInput(e){
    if (e.code === "ArrowUp") {
        setDirection(1);
    } else if (e.code === "ArrowRight") {
        setDirection(2);
    } else if (e.code === "ArrowDown") {
        setDirection(3);
    } else if (e.code === "ArrowLeft"){
        setDirection(4);
    }
}

function loadFrame(){
    if (gameOver()) {
        return;
    }

    colourBoard("black", 0, 0, board.width, board.height);

    updateSnakeXY(direction);
    updateSnake()

    background.fillStyle="lime";
    for (let i = 0; i<snake.length; i++) {
        background.fillRect(snake[i][0], snake[i][1], blocksize, blocksize);
    }

    if (foodIsEaten()) {
        setFoodPoint();
    }
    colourBoard("red", foodX, foodY, blocksize, blocksize);

    console.log("snake length: "+snake.length);
    highscore.innerText = "Snake length:"+snake.length;
}

function updateSnake() {
    var snake_updated = [];
    snake_updated.push([snakeX,snakeY]); // head set

    for (let i = 0; i<snake.length; i++) {
        snake_updated.push(snake[i]);
    }

    if (!foodIsEaten()) {
        snake_updated.pop();
    }

    snake = snake_updated;
}

function updateSnakeXY(dirNr) {
    oldX = snakeX;
    oldY = snakeY;

    if (dirNr == 1) { // up
        snakeY-=blocksize;
    } else if (dirNr == 2) { // right
        snakeX+=blocksize;
    } else if (dirNr == 3) { // down
        snakeY+=blocksize;
    } else if (dirNr == 4) { // left
        snakeX-=blocksize;
    }
}

function setDirection(nr) {
    if (direction == nr ) {
        return;
    }

    if (oppositeDirection(nr)) {
        return;
    }

    direction = nr;
}

function oppositeDirection(nr) {
    let check = direction + nr;

    if (check == 4 || check == 6) { // 1+3 or 2+4 = opposites
        return true;
    }

    return false;
}

function gameOver() {
    if (snakeX < 0 ||snakeY < 0 || snakeX > board.width || snakeY > board.height){
        alert("Game over!");
        return true;
    }
    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i][0] && snakeY === snake[i][1]) {
            alert("Game over!");
            return true;
        }
    }
    return false;
}



function setFoodPoint() {
    do {
        foodX = getRandomPoint();
        foodY = getRandomPoint();
    } while (snake.some(segment => segment[0] === foodX && segment[1] === foodY));
}

function foodIsEaten() {
    return snakeX === foodX && snakeY === foodY;
}

function colourBoard(colour, a,b,c,d) {
    background.fillStyle = colour;
    background.fillRect(a,b,c,d);
}

function getRandomPoint() {
    return Math.floor(Math.random() * BOARD_HEIGHT) * blocksize;
}