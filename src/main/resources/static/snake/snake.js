import { initializeSnake, load, updateSnake, updateSnakeXY, setDirection, snakeX, snakeY, getFoodPoint} from "./snakeLogic.js";
import { renderScoreBoard } from "../scoreBoard.js";
import { initializeGameButtons } from "../gameButtons.js";
import { gameOver } from "../alertMessage.js";
import { processUserInput } from "../userInput.js";

const blocksize = 20;
const BOARD_HEIGHT = 35;
const BOARD_WIDTH = 35;
var board;
var background;

var snake = [];

// ----------------- Game Window -----------------
window.onload = function () {
    sessionStorage.setItem("gameStarted", "false");
    initialize();

    initializeSnake(blocksize, BOARD_HEIGHT, BOARD_WIDTH);

    loadFrame();

    // TODO: start interval, when game starts, keep it at initial state until game starts
    setInterval(loadFrame, 1000 / 10);
}

// ----------------- main operations -----------------
function initialize() {
    board = document.getElementById("board");
    board.height = BOARD_HEIGHT * blocksize;
    board.width = BOARD_WIDTH * blocksize;
    background = board.getContext("2d");

    sessionStorage.setItem("gameOver", "false");

    initializeGameButtons(
        function() {
            initialize();
            initializeSnake(blocksize, BOARD_HEIGHT, BOARD_WIDTH);
            sessionStorage.setItem("gameOver", "false");
            sessionStorage.setItem("gameStarted", "true");
            console.log("game start button clicked");
        },
        function() {
            alert("Game paused!");
        },
        function() {
            initialize();
            initializeSnake(blocksize, BOARD_HEIGHT, BOARD_WIDTH);
            sessionStorage.setItem("gameOver", "false");
            sessionStorage.setItem("gameStarted", "true");
            console.log("game restart button clicked");
        }
    );
}

// ----------------- Game Frame -----------------



function loadFrame(){
    if (sessionStorage.getItem("gameOver") === "true" ) {
        return;
    }

    snake = load(snake);

    if (gameOver(snake, board)) {
        return;
    }

    console.log("snake: ("+snakeX+",", snakeY+")");

    renderBoard();

    renderScoreBoard(snake.length);
}


// -------------------------------------------------
function renderBoard() {
    let food = getFoodPoint();

    colourBoard("black", 0, 0, board.width, board.height);
    background.fillStyle = "lime";
    for (let i = 0; i < snake.length; i++) {
        background.fillRect(snake[i][0], snake[i][1], blocksize, blocksize);
    }

    colourBoard("red", food[0], food[1], blocksize, blocksize);
}

function colourBoard(colour, a,b,c,d) {
    background.fillStyle = colour;
    background.fillRect(a,b,c,d);
}
