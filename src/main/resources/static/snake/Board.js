
var canvas;

export const BoardColors = {
    BACKGROUND: "black",
    SNAKE: "lime",
    FOOD: "red"
};

export class Graphics {
    constructor(grid) {
        this.grid = grid;
    }

    fillAreaWithColor(colour, a, b, c, d) {
        this.grid.fillStyle = colour;
        this.grid.fillRect(a,b,c,d);
    }
}

export class Board {

    constructor(grid) {
        this.height = grid.BOARD_HEIGHT;
        this.width = grid.BOARD_WIDTH
        this.blockSize = grid.BLOCKSIZE;
        this.initializeBoard();
    }

    initializeBoard() {
        const canvas = document.getElementById("canvas");
        canvas.height = this.height * this.blocksize;
        canvas.width = this.width * this.blocksize;
        const grid = canvas.getContext("2d");
        this.graphics = new Graphics(grid);
    }

    renderBoard(state) {
        this.graphics.fillAreaWithColor(BoardColors.BACKGROUND, 0, 0, canvas.width, canvas.height);

        // snake
        for (let part of state.snake.body) {
            this.graphics.fillAreaWithColor(BoardColors.SNAKE, part[0], part[1], this.blockSize, this.blockSize);
        }

        // food
        this.graphics.fillAreaWithColor(BoardColors.FOOD, state.food[0], state.food[1], this.blocksize, this.blocksize);
    }
}

