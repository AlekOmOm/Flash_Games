
// ----------------- Constants -----------------

import {getRandomPoint} from "./SnakeGame.js";

export class Food {

    foodX; foodY;
    isEaten;

    constructor() {
        this.foodX = getRandomPoint();
        this.foodY = getRandomPoint();
    }

    getFoodPoint() {
        return [this.foodX, this.foodY];
    }

    setNewPoint(snake) {
        do {
            this.foodX = getRandomPoint();
            this.foodY = getRandomPoint();
        } while (snake.some(part => part[0] === this.foodX && part[1] === this.foodY));
    }

    setIsEaten(bool) {
        this.isEaten = bool;
    }

    getIsEaten() {
        return this.isEaten;
    }



}