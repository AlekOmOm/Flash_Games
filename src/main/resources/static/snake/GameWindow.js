
// ----------------- Game Buttons -----------------

import {initializeGameButtons} from '../GameButtons.js';
import {SnakeGame} from './SnakeGame.js';

var doc = document;


// ----------------- Game Window -----------------
window.onload = function() {

    let game = new SnakeGame();
    initializeGameButtons(game.pauseGame(), game.restartGame());
}