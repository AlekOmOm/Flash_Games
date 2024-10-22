
import { Board } from './Board.js';
import { State } from './State.js';
import {initGameButtonListeners} from "../GameButtons";


export const Grid = {
    BLOCKSIZE: 20,
    BOARD_HEIGHT: 35,
    BOARD_WIDTH: 35
}

export function getRandomBlockPoint() {
    // get rounded random number between 0 and BOARD_HEIGHT
    return Math.floor(Math.random() * Grid.BOARD_HEIGHT*Grid.BLOCKSIZE);
}

export const status = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    RESTARTED: "RESTARTED"
}

export const STATE_UPDATE_RATE = 1000/10; // 10 fps


export class SnakeGame {

    constructor() {
        this.initBoardAndState();
        this.initStatusFunctions();
        this.currentStatus = status.RUNNING;
        this.updateGameRendering();

        this.debugLogger();
    }

    initBoardAndState() {
        this.board = new Board(Grid);
        this.state = new State(this.board);
    }

    initStatusFunctions() {
        this.statusFunctions = {
            [status.RUNNING]: this.getRunningState.bind(this),
            [status.PAUSED]: this.getIdleState.bind(this),
            [status.RESTARTED]: this.getResetState.bind(this)
        };
    }

    getRunningState() {
        this.state.update();
        return this.state;
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
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
        }
        this.renderInterval = setInterval(this.render(), STATE_UPDATE_RATE);
    }
    render() {
        this.board.renderBoard(this.statusFunctions[this.currentStatus]());
    }




    // ----------------- Game -----------------

    pauseGame() {
        this.setStatus(status.PAUSED);
    }

    restartGame() {
        this.setStatus(status.RESTARTED);
    }

    setStatus(newStatus) {
        this.currentStatus = newStatus;
        this.updateGameRendering();
    }


    // -----------------  Debug -----------------

    debugLogger() {
        console.log("SnakeGame.js loaded");
        // set pause status, and then print board, snake and food positions

        console.log("1. Board: ");
        console.log(" canvasEle: (height", this.board.canvasEle.height + ", width", this.board.canvasEle.width + ")");
        console.log(" canvas: ", this.board.canvas);
        console.log(" grid: (height", this.board.grid.BOARD_HEIGHT + ", width", this.board.grid.BOARD_WIDTH + ", blocksize", this.board.grid.BLOCKSIZE + ")");

        console.log("2. Snake: ", this.state.snake);
        console.log(" body: ", this.state.snake.body);
        console.log(" direction: ", this.state.snake.direction);

        console.log("3. Food: ", this.state.food);

    }

}
