
var canvas;

export class Board {
    grid;
    blocksize;
    colours = ["black", "lime", "red"];


    constructor(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZEPrm) {
        this.BLOCKSIZE = BLOCKSIZEPrm;
        this.initializeBoard();
    }

    initializeBoard(BOARD_HEIGHT, BOARD_WIDTH) {
        canvas = document.getElementById("canvas");
        canvas.height = BOARD_HEIGHT * this.blocksize;
        canvas.width = BOARD_WIDTH * this.blocksize;
        this.grid = canvas.getContext("2d");
    }


    renderBoard(state) {
        // background
        colourBoard(this.colours[0], 0, 0, canvas.width, canvas.height);

        // snake
        this.grid.fillStyle = this.colours[1];
        for (let i = 0; i < state.snake.length; i++) {
            this.grid.fillRect(state.snake[i][0], state.snake[i][1], this.blocksize, this.BLOCKSIZE);
        }

        // food
        colourBoard(this.colours[2], state.food[0], state.food[1], this.blocksize, this.blocksize);
    }

    colourBoard(colour, a,b,c,d) {
        this.grid.fillStyle = colour;
        this.grid.fillRect(a,b,c,d);
    }

}

