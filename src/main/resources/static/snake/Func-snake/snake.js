
const scoreEle = document.getElementById("highscore");
const highscoreEle = document.getElementById("score");
const resetHighscoreBtn = document.getElementById("reset-highscore-button");
const pauseBtn = document.getElementById("pause-button");
const restartBtn = document.getElementById("pause-button");
const canvas = document.getElementById("canvas")

let score = 0;
let highscore = 0;

window.onload = function() {
    loadScoreBoard();
    loadGameButtons();
    loadGame();
}


function loadScoreBoard() {
    scoreEle.innerText = score.toString();
    highscore = sessionStorage.getItem("highscore") ? parseInt(sessionStorage.getItem("highscore")) : 0;

    if (score > highscore) {
        highscore = score;
        highscoreEle.innerText = highscore.toString();
        sessionStorage.setItem("highscore", highscore);
    }

    document.addEventListener(this.even, resetHighscoreBtn.onclick, resetHighscore())
}

function loadGameButtons() {

    re


}




function loadGame() {



}