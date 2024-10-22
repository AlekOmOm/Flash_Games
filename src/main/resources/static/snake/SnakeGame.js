import { Board } from './Board.js';
import { State } from './State.js';
import { Grid } from './Grid.js';
import {initGameButtonListeners} from "../GameButtons.js";



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
        this.startGameRendering();
        this.debugLogger();
    }

    count() {
        console.log("count");
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

    startGameRendering() {
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
        }
        // this.renderInterval = setInterval(this.render.bind(this), STATE_UPDATE_RATE);
        this.render();
    }
    render() {
        this.statusCounter = 0;
        if (this.currentStatus === status.PAUSED && this.statusCounter < 1) {
            this.board.renderBoard(this.statusFunctions[this.currentStatus]());
        } else if (this.currentStatus === status.RESTARTED && this.statusCounter < 1) {
            this.statusCounter++;
            this.board.renderBoard(this.statusFunctions[this.currentStatus]());
            this.setStatus(status.RUNNING);
        } else if (this.currentStatus === status.RUNNING) {
            this.statusCounter = 0;
            this.board.renderBoard(this.statusFunctions[this.currentStatus]());
        }
    }




    // ----------------- Game -----------------

    pauseGame() {
        this.setStatus(status.PAUSED);
        this.state.snake.initMoveListener(); // Reinitialize the move listener
    }

    restartGame() {
        this.setStatus(status.RESTARTED);
        this.state.snake.initMoveListener(); // Reinitialize the move listener
    }

    setStatus(newStatus) {
        this.currentStatus = newStatus;
        this.startGameRendering();
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
