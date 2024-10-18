
var start = document.getElementById("start-button");
var pause = document.getElementById("pause-button");
var restart = document.getElementById("restart-button");
var resetHighscore = document.getElementById("reset-highscore-button");


export function initializeGameButtons(startCallback, pauseCallback, restartCallback) {
    start.addEventListener("click", startCallback);
    pause.addEventListener("click", pauseCallback);
    restart.addEventListener("click", restartCallback);
    resetHighscore.addEventListener("click", function () {
        sessionStorage.setItem("highscore", 0);
        document.getElementById("highscore").innerHTML = ""+sessionStorage.getItem("highscore");
    });
    resetHighscore.innerHTML = '&#x21ba;';
}
