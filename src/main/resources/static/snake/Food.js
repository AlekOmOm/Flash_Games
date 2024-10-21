
// ----------------- Constants -----------------

import {getRandomPoint} from "./SnakeGame.js";

export class Food {

    foodX; foodY;

    constructor() {
        this.foodX = getRandomPoint();
        this.foodY = getRandomPoint();
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
        } while (snake.some(segment => segment[0] === this.foodX && segment[1] === this.foodY));
    }

    foodIsEaten(snakeX, snakeY) {
        return snakeX === this.foodX && snakeY === this.foodY;
    }

}