import {Grid_Consts} from "./Grid.js";

export const BoardColors = {
    BACKGROUND: "black",
    SNAKE: "lime",
    FOOD: "red"
};

export class Graphics {
    constructor(canvas) {
        this.canvas = canvas;
    }

    fillEntityWithColor(colour, x, y) {
        this.canvas.fillStyle = colour;
        this.canvas.fillRect(x, y, Grid_Consts.BLOCK_SIZE, Grid_Consts.BLOCK_SIZE);
    }
    fillGridWithBackgroundColour() {
        this.canvas.fillStyle = BoardColors.BACKGROUND;
        this.canvas.fillRect(0, 0, Grid_Consts.CANVAS_HEIGHT, Grid_Consts.CANVAS_WIDTH);
    }
}

export class Board {

    constructor(grid) {
        this.grid = grid;
        this.initializeBoard();
    }

    initializeBoard() {
        let canvasEle = document.getElementById("canvas");
        canvasEle.height = Grid_Consts.CANVAS_HEIGHT;
        canvasEle.width = Grid_Consts.CANVAS_WIDTH;
        let canvas = canvasEle.getContext("2d");
        this.graphics = new Graphics(canvas);
    }

    renderBoard(state) {
        console.log("state: ", state);
        this.graphics.fillGridWithBackgroundColour();

        // snake
        for (let bodyElement of state.snake.body) {
            this.graphics.fillEntityWithColor(BoardColors.SNAKE, bodyElement.x, bodyElement.y);
        }

        // food
        this.graphics.fillEntityWithColor(BoardColors.FOOD, state.food.foodX, state.food.foodY);
    }
}

