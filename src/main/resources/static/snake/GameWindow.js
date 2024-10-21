
import {SnakeGame} from "./SnakeGame"
import {initializeGameButtons} from "../gameButtons";
import {renderScoreBoard} from "../ScoreBoard";




// ----------------- Game Window -----------------
window.onload = loadBrowserWindow ();

loadBrowserWindow() {
    SnakeGame game = new SnakeGame()
    initializeGameButtons(game.pauseGame(), game.restartGame());
}
