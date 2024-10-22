var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");
var restartButton = document.getElementById("restart-button");
var resetHighscoreButton = document.getElementById("reset-highscore-button");


// ----------------- Buttons  -----------------

function attachButtonListener(button, handler) {
    button.addEventListener("click", handler);
}

export function initGameButtonListeners(pauseCallback, restartCallback) {
    //start.addEventListener("click", startCallback);
    attachButtonListener(pauseButton, pauseCallback);
    attachButtonListener(restartButton, restartCallback);
    attachButtonListener(resetHighscoreButton, resetHighscore);

    displayHighscore();
    resetHighscore.innerHTML = '&#x21ba;';
}

// ----------------- Highscore Operations -----------------
function resetHighscore() {
    resetHighscore.addEventListener("click", function () {
        sessionStorage.setItem("highscore", 0);
        displayHighscore();
    });
}

function displayHighscore() {
    document.getElementById("highscore").innerHTML = "" + sessionStorage.getItem("highscore");
}
