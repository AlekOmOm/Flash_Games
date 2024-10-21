


class Board {
    background;
    blocksize;
    colours = ["black", "lime", "red"];

    constructor(BOARD_HEIGHT, BOARD_WIDTH, BLOCKSIZEPrm, doc) {
        this.BLOCKSIZE = BLOCKSIZEPrm;
        this.document = doc;
        this.initializeBoard();
    }

    initializeBoard() {
        this.board = document.getElementById("board");
        this.board.height = BOARD_HEIGHT * this.blocksize;
        this.board.width = BOARD_WIDTH * this.blocksize;
        this.background = this.board.getContext("2d");
    }

    renderBoard(state) {

        let food = state.getFoodPoint();
        let snake = state.getSnake();

        colourBoard(this.colours[0], 0, 0, board.width, board.height);

        background.fillStyle = this.colours[1];
        for (let i = 0; i < snake.length; i++) {
            background.fillRect(snake[i][0], snake[i][1], this.blocksize, this.BLOCKSIZE);
        }

        colourBoard(this.colours[2], food[0], food[1], BLOCKSIZE, BLOCKSIZE);
    }

    colourBoard(colour, a,b,c,d) {
        background.fillStyle = colour;
        background.fillRect(a,b,c,d);
    }


}