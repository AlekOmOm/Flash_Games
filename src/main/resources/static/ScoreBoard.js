import { message } from "./message.js";

var highscoreElement = document.getElementById("highscore");
var scoreElement = document.getElementById("score");
var startHighscore = 0;

const ScoreColours = {
    NEW_HIGHSCORE : "red",
    DEFAULT : "black"
}

export function renderScoreBoard(currentScore) {
    if (highscoreElement === null && scoreElement === null) {
        return;
    }

    var score = (currentScore != null) ? currentScore : 0;

    let storedHighscore = sessionStorage.getItem("highscore");
    var highscore = (storedHighscore != null) ? parseInt(storedHighscore) : 0;

    startHighscore = (score == 0 && highscore != 0) ? highscore : (score == 0 && highscore == 0) ? 0 : startHighscore;

    if (score > highscore) {
        if (score > startHighscore) {
            highscoreElement.style.color = ScoreColours.NEW_HIGHSCORE;
        } else {
            highscoreElement.style.color = ScoreColours.DEFAULT;
        }
        highscore = score; // runnig update of highscore
    } else {
        highscoreElement.style.color = ScoreColours.DEFAULT;
    }

    // elements + set highscoreSess
    sessionStorage.setItem("highscore", highscore);
    highscoreElement.textContent = highscore.toString();
    scoreElement.textContent = score.toString();
}
