
import { Board } from './Board.js';
import { State } from './State.js';


export const Grid = {
    BLOCKSIZE: 20,
    BOARD_HEIGHT: 35,
    BOARD_WIDTH: 35
}

export const status = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    RESTARTED: "RESTARTED"
}

const STATE_UPDATE_RATE = 100; // 10 fps


export class SnakeGame {

    constructor() {
        this.initBoardAndState();
        this.initStatusFunctions();
        this.currentStatus = status.RUNNING;
        this.updateGameRendering();
    }

    initBoardAndState() {
        this.board = new Board(Grid);
        this.state = new State(this.board);
    }

    initStatusFunctions() {
        this.statusFunctions = {
            [status.RUNNING]: this.getRunningState(),
            [status.PAUSED]: this.getIdleState(),
            [status.RESTARTED]: this.getResetState()
        };
    }

    getRunningState() {
        return this.state.update();
    }

    getIdleState() {
        return this.state;
    }

    getResetState() {
        this.state = new State(new Board(Grid));
        return this.state;
    }


    // -----------------  -----------------

    updateGameRendering() {
        this.state = this.statusFunctions[this.currentStatus]();
        this.board.renderBoard(this.state);
        setInterval(this.board, FRAME_RATE);
    }

    // ----------------- Game -----------------

    pauseGame() {
        this.currentStatus = status.PAUSED;
        this.updateGameRendering();
    }

    restartGame() {
        this.currentStatus = status.RESTARTED;
        this.updateGameRendering();
    }

}

export function getRandomPoint() {
    // get rounded random number between 0 and BOARD_HEIGHT
    return Math.floor(Math.random() * Grid.BOARD_HEIGHT).toFixed(0);
}