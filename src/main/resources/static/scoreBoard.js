import { message } from "./message.js";

var highscore = document.getElementById("highscore");
var score = document.getElementById("score");


export function renderScoreBoard(currentScore) {

    let sessionHighscore = sessionStorage.getItem("highscore");

    if (highscore == null && sessionHighscore == null) {
        highscore.textContent = ""+1; // TODO: change to 0, atm says null
        sessionHighscore = "0";
    }


    if (currentScore > sessionHighscore) {
        sessionStorage.setItem("highscoreElement", currentScore);
        // set highscore color to red
        highscore.style.color = "red";
        message(highscore, "New Highscore!", "red", "red", 3000);
    } else {
        highscore.textContent = ""+sessionHighscore;
        highscore.style.color = "black";
    }

    score.textContent = ""+currentScore;
}
