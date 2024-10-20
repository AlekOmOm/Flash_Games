import {
    initializeSnake,
    loadSnake,
    updateSnake,
    updateSnakeXY,
    setDirection,
    snakeX,
    snakeY,
    getFoodPoint,
    getSnake,
} from "./snakeLogic.js";
import { renderScoreBoard } from "../scoreBoard.js";
import { initializeGameButtons } from "../gameButtons.js";
import { gameOver } from "../alertMessage.js";
import { processUserInput } from "../userInput.js";

const BLOCKSIZE = 20;
const BOARD_HEIGHT = 35; // TODO fix height and width setting to with or without "* BLOCKSIZE"
const BOARD_WIDTH = 35;
var board;
var background;

// ----------------- Game Window -----------------
window.onload = function () {
    initialize();

    initializeSnake(BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH);

    loadFrame();

    // TODO: start interval, when game starts, keep it at initial state until game starts
    if (sessionStorage.getItem("gameOver") === "true" ) {
        clearInterval(loadFrame);
    }

    setInterval(loadFrame, 1000 / 10);
}

function restart() {
    initialize();
    initializeSnake(BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH);
    sessionStorage.setItem("gameOver", "false");
    sessionStorage.setItem("gameStarted", "true");
    console.log("game start button clicked");
}

// ----------------- main operations -----------------
function initialize() {
    initializeBoard();

    sessionStorage.setItem("gameOver", "false");
    sessionStorage.setItem("gameStarted", "false");

    initializeGameButtons(
        /*function() {
            initialize();
            initializeSnake(BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH);
            sessionStorage.setItem("gameOver", "false");
            sessionStorage.setItem("gameStarted", "true");
            console.log("game start button clicked");
        },*/
        function() {
            alert("Game paused!");
        },
        function() {
            restart();
        }
    );
    initializeUserInput();
}

function initializeUserInput() {
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

// ----------------- Game Frame -----------------

function loadFrame(){
    loadSnake();

    if (gameOver(getSnake(), BOARD_WIDTH, BOARD_HEIGHT)) {
        return;
    }

    console.log("snake: ("+snakeLoaded[0][0]+",", snakeLoaded[0][1]+")");

    renderBoard();

    renderScoreBoard(getSnake().length-1);
}


// ----------------- Board -----------------
function initializeBoard() {
    board = document.getElementById("board");
    board.height = BOARD_HEIGHT * BLOCKSIZE;
    board.width = BOARD_WIDTH * BLOCKSIZE;
    background = board.getContext("2d");

    console.log("Debug Board");
    console.log(" height:"+ board.height);
    console.log(" width:"+ board.width);

}

function renderBoard() {
    let food = getFoodPoint();
    let snake = getSnake();

    console.log("DEBUG renderBoard()");
    console.log("snake: "+snake.length);

    colourBoard("black", 0, 0, board.width, board.height);
    background.fillStyle = "lime";
    for (let i = 0; i < snake.length; i++) {
        background.fillRect(snake[i][0], snake[i][1], BLOCKSIZE, BLOCKSIZE);
    }

    colourBoard("red", food[0], food[1], BLOCKSIZE, BLOCKSIZE);
}

function colourBoard(colour, a,b,c,d) {
    background.fillStyle = colour;
    background.fillRect(a,b,c,d);
}
