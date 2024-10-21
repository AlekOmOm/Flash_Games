

// ----------------- Constants -----------------

class Food {

    foodX; foodY;

    constructor() {
        this.foodX = this.getRandomPoint();
        this.foodY = this.getRandomPoint();
    }

    getFoodPoint() {
        if (this.foodIsEaten()) {
            this.setFoodPoint();
        }
        return [this.foodX, this.foodY];
    }

    setFoodPoint(snake) {
        do {
            this.foodX = getRandomPoint();
            this.foodY = getRandomPoint();
        } while (snake.some(segment => segment[0] === foodX && segment[1] === foodY));
    }

    foodIsEaten(snakeX, snakeY) {
        return snakeX === this.foodX && snakeY === this.foodY;
    }


    getRandomPoint() {
        // get rounded random number between 0 and BOARD_HEIGHT
        return Math.floor(Math.random() * this.board.height).toFixed(0);
    }
}