

// ----------------- Constants -----------------

class Food {

    foodX; foodY;

    constructor() {
        this.foodX = 0;
        this.foodY = 0;
    }


    getFoodPoint() {
        if (foodIsEaten()) {
            setFoodPoint();
        }
        return [this.foodX, this.foodY];
    }

    setFoodPoint(snake) {
        do {
            this.foodX = getRandomPoint();
            this.foodY = getRandomPoint();
        } while (snake.some(segment => segment[0] === foodX && segment[1] === foodY));
    }

    foodIsEaten() {
        return snakeX === foodX && snakeY === foodY;
    }
}

// ----------------- Food -----------------

