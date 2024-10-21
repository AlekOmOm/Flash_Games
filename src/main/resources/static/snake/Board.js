


export class Board {
    grid;
    blocksize;
    colours = ["black", "lime", "red"];
    document;

    constructor(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZEPrm, doc) {
        this.BLOCKSIZE = BLOCKSIZEPrm;
        this.document = doc;
        this.initializeBoard();
    }

    initializeBoard() {
        this.board = this.document.getElementById("board");
        this.board.height = BOARD_HEIGHT * this.blocksize;
        this.board.width = BOARD_WIDTH * this.blocksize;
        this.grid = this.board.getContext("2d");
    }

    renderBoard(state) {
        // background
        colourBoard(this.colours[0], 0, 0, this.board.width, this.board.height);

        // snake
        this.grid.fillStyle = this.colours[1];
        for (let i = 0; i < state.snake.length; i++) {
            background.fillRect(state.snake[i][0], state.snake[i][1], this.blocksize, this.BLOCKSIZE);
        }

        // food
        colourBoard(this.colours[2], state.food[0], state.food[1], BLOCKSIZE, BLOCKSIZE);
    }

    colourBoard(colour, a,b,c,d) {
        background.fillStyle = colour;
        background.fillRect(a,b,c,d);
    }


}