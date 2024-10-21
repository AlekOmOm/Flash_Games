import { Board } from "Board.js";
import {SnakeEntity} from "./SnakeEntity";


class State {

    board;
    snake;
    food;


    constructor(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZE, document) {
        this.board = new Board(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZE, document);
        this.snake = new SnakeEntity();
        this.food = [this.getRandomPoint(), this.getRandomPoint()];
    }



    getRandomPoint() {
        // get rounded random number between 0 and BOARD_HEIGHT
        return Math.floor(Math.random() * this.board.height).toFixed(0);
    }
}