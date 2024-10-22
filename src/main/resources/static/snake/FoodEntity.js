
// ----------------- Constants -----------------

import {getRandomBlockPoint} from "./SnakeGame.js";

export class FoodEntity {

    foodX; foodY;
    isEaten = false;

    constructor(snake) {
        this.setNewPoint(snake);
    }

    getFoodPoint() {
        return [this.foodX, this.foodY];
    }

    setNewPoint(snake) {
        do {
            this.foodX = getRandomBlockPoint();
            this.foodY = getRandomBlockPoint();
        } while (snake.body.some(part => part[0] === this.foodX && part[1] === this.foodY));
    }

    setIsEaten(bool) {
        this.isEaten = bool;
    }

    getIsEaten() {
        return this.isEaten;
    }



}