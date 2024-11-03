import { Board } from './Board.js';
import { State } from './State.js';
import { Grid } from './Grid.js';



export const status = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    RESTARTED: "RESTARTED"
}

export const STATE_UPDATE_RATE = 1000/10; // 10 fps

// responsibility:
//      init of Grid, Board, State,
//      game status of Pause, Restart, and Running,
//      render the game

export class SnakeGame {

    constructor() {
        this.initBoardAndState();
        this.initStatusFunctions();
        this.currentStatus = status.RUNNING;
        this.startGameRendering();
        this.debugLogger();
    }

    // ----------------- init -----------------
    initBoardAndState() {
        this.grid = new Grid();
        this.board = new Board(this.grid);
        this.state = new State(this.board);
    }

    initStatusFunctions() {
        this.statusFunctions = {
            [status.RUNNING]: this.getRunningState.bind(this),
            [status.PAUSED]: this.getIdleState.bind(this),
            [status.RESTARTED]: this.getResetState.bind(this)
        };
    }

    // ----------------- Game Status -----------------

    pauseGame() {
        this.updateStatus(status.PAUSED);
        this.state.snake.initMoveListener(); // Reinitialize the move listener
    }

    restartGame() {
        this.updateStatus(status.RESTARTED);
        this.state.snake.initMoveListener(); // Reinitialize the move listener
    }

    updateStatus(newStatus) {
        this.currentStatus = newStatus;
        this.startGameRendering();
    }

    // ----------------- Rendering -----------------

    startGameRendering() {
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
        }
        // this.renderInterval = setInterval(this.render.bind(this), STATE_UPDATE_RATE);
        this.render();
    }

    render() {
        switch (this.currentStatus) {
            case status.RUNNING:
                this.handleRunningStatus();
                break;
            case status.PAUSED:
                this.handlePausedStatus();
                break;
            case status.RESTARTED:
                this.handleRestartedStatus();
                break;
            default:
                console.error('Invalid status');
        }
    }

    // handle status
        // shift status (upon GameButton click)
        // avoid repeated rendering of reset and pause status
    handleRunningStatus() {
        this.statusCounter = 0;
        this.state.update();
    }

    handlePausedStatus() {
        if(this.statusCounter < 1) {
            this.statusCounter++;
            this.updateStatus(status.PAUSED);
        }
    }

    handleRestartedStatus() {
        if(this.statusCounter < 1) {
            this.statusCounter++;
            this.state = new State(new Board(this.grid));
            this.updateStatus(status.RUNNING);
        }
    }




    // -----------------  Debug -----------------

    debugLogger() {
        console.log("SnakeGame.js loaded");
        // set pause status, and then print board, snake and food positions

        console.log("1. Board: ");
        console.log(" grid: (height", this.board.grid.BOARD_HEIGHT + ", width", this.board.grid.BOARD_WIDTH + ", blocksize", this.board.grid.BLOCKSIZE + ")");

        console.log("2. State: ", this.state);

        console.log("  - Snake: ", this.state.snake);
        console.log("     body: ", this.state.snake.body);
        console.log("     direction: ", this.state.snake.direction);

        console.log("  - Food: ", this.state.food);
    }

}
