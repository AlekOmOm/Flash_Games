export const BoardColors = {
    BACKGROUND: "black",
    SNAKE: "lime",
    FOOD: "red"
};

export class Graphics {
    constructor(canvas) {
        this.canvas = canvas;
    }

    fillAreaWithColor(colour, a, b, c, d) {
        this.canvas.fillStyle = colour;
        this.canvas.fillRect(a,b,c,d);
    }
}

export class Board {

    constructor(grid) {
        this.grid = grid;
        this.initializeBoard();
    }

    initializeBoard() {
        this.canvasEle = document.getElementById("canvas");
        this.canvasEle.height = this.grid.BOARD_HEIGHT * this.grid.BLOCKSIZE;
        this.canvasEle.width = this.grid.BOARD_WIDTH * this.grid.BLOCKSIZE;
        this.canvas = this.canvasEle.getContext("2d");
        this.graphics = new Graphics(this.canvas);
    }

    renderBoard(state) {
        console.log("state: ", state);
        this.graphics.fillAreaWithColor(BoardColors.BACKGROUND, 0, 0, this.canvasEle.width, this.canvasEle.height);

        // snake
        for (let part of state.snake.body) {
            this.graphics.fillAreaWithColor(BoardColors.SNAKE, part[0], part[1], this.grid.BLOCKSIZE, this.grid.BLOCKSIZE);
        }

        // food
        this.graphics.fillAreaWithColor(BoardColors.FOOD, state.food.foodX, state.food.foodY, this.grid.BLOCKSIZE, this.grid.BLOCKSIZE);
    }




}

