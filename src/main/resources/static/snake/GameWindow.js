// This file is responsible for initializing the game window and the game itself.
import { initGameButtonListeners } from "../GameButtons.js";
import { SnakeGame } from './SnakeGame.js';
import {renderScoreBoard} from "../ScoreBoard.js";

// main of the Game Window
window.onload = function() {
    new GameWindow();

};

export class GameWindow {
    constructor() {
        this.game = new SnakeGame();
        this.initGameButtonListeners();
        this.initScoreBoard();
    }

    initGameButtonListeners() {
        initGameButtonListeners(
            () => this.game.pauseGame(),
            () => this.game.restartGame()
        );
    }

    initScoreBoard() {
        renderScoreBoard(0);
    }
}

