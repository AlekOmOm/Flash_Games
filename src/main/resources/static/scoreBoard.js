import { message } from "./message.js";

var highscore = document.getElementById("highscore");
var score = document.getElementById("score");


export function renderScoreBoard(currentScore) {
    let highscore = document.getElementById("highscore");
    let highScoreSession = sessionStorage.getItem("highscore");

    if (highscore == null && highScoreSession == null) {
        highscore = 0;
    }


    if (currentScore > highScoreSession) {
        sessionStorage.setItem("highscore", currentScore);
        // set highscore color to red
        highscore.style.color = "red";
        message(highscore, "New Highscore!", "red", "red", 3000);
    } else {
        highscore.textContent = ""+highScoreSession;
        highscore.style.color = "black";
    }



    score.textContent = ""+currentScore;
}
