
import { Board } from './Board.js';
import { State } from './State.js';
import {gameOver} from "../alertMessage";
import {renderScoreBoard} from "../scoreBoard";



const BLOCKSIZE = 20;
const BOARD_HEIGHT = 35; // TODO fix height and width setting to with or without "* BLOCKSIZE"
const BOARD_WIDTH = 35;


class SnakeGame {
    // gamestate
    board;
    state;

    constructor() {
        this.board = new Board(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZE, document);
        this.state = new State();
    }

    // ----------------- Game Window -----------------

    loadGameWindow() {

        board.renderBoard(state):

        loadSnake();

        if (gameOver(getSnake(), board.width, board.height)) {
            return;
        }


        renderBoard();
        renderScoreBoard(getSnake().length-1);
    }


    // ----------------- Game State  -----------------
    pauseGame() {

    }

    restartGame() {

    }

    /*
    initializeBoard();

    sessionStorage.setItem("gameOver", "false");
    sessionStorage.setItem("gameStarted", "false");

    initializeGameButtons(
    function() {
        initialize();
        initializeSnake(BLOCKSIZE, BOARD_HEIGHT, BOARD_WIDTH);
        sessionStorage.setItem("gameOver", "false");
        sessionStorage.setItem("gameStarted", "true");
        console.log("game start button clicked");
    },
    function() {
        alert("Game paused!");
    },
    function() {
        restart();
    }

    initializeUserInput();

    loadFrame();
    setInterval(loadFrame, 1000 / 10);
    */

}