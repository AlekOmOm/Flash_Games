import { message } from "./message.js";

var highscore = document.getElementById("highscore");
var score = document.getElementById("score");


export function renderScoreBoard(currentScore) {
    let highScoreSession = sessionStorage.getItem("highscore");

    if (highScoreSession != null) {
        if (currentScore > highScoreSession) {
            sessionStorage.setItem("highscore", currentScore);
            // set highscore color to red
            highscore.style.color = "red";
            message(highscore, "New Highscore!", "red", "red", 3000);
        } else {
            highscore.textContent = ""+highScoreSession;
            highscore.style.color = "black";
        }
    } else { // -> no highscore in
        sessionStorage.setItem("highscore", currentScore);
        message(highscore, "New Highscore!", "red", "red", 3000);
    }

    score.textContent = ""+currentScore;
}
