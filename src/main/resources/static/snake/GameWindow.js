// This file is responsible for initializing the game window and the game itself.
import { initGameButtonListeners } from "../GameButtons.js";
import { SnakeGame } from './SnakeGame.js';

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
        this.updateScore(0);
        this.updateHighScore();
    }

    updateScore(score) {
        document.getElementById("score").innerText = score;
        this.updateHighScore();
    }

    updateHighScore() {
        this.score = document.getElementById("score").innerText;
        let highScore = sessionStorage.getItem("highscore") || 0;

        if (this.score > highScore) {
            sessionStorage.setItem("highscore", this.score);
            document.getElementById("highscore").style.color = "red";
        } else {
            document.getElementById("highscore").style.color = "black";
        }

        document.getElementById("highscore").innerText = highScore;
    }
}

