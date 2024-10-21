
import { Board } from './Board.js';
import { State } from './State.js';



const BLOCKSIZE = 20;
const BOARD_HEIGHT = 35; // TODO fix height and width setting to with or without "* BLOCKSIZE"
const BOARD_WIDTH = 35;


export class SnakeGame {
    // gamestate -> playing, game over, paused, restarted
    // board -> board rendering

    board;
    state;

    constructor() {
        this.board = new Board(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZE);
        this.state = new State(this.board);
        this.board.renderBoard(this.getState());
        setFrameRate(10);
    }

    // ----------------- Game Window -----------------
    setFrameRate(frameRate){
        setInterval(this.board.renderBoard(this.getState()), (100 / 10)*frameRate); // 10 frames per second
    }

    getState() {
        this.state.update();
        return this.state;
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

export function getRandomPoint() {
    // get rounded random number between 0 and BOARD_HEIGHT
    return Math.floor(Math.random() * BOARD_HEIGHT).toFixed(0);
}