
class state {
    constructor() {
        this.snake = [];
        this.snake[0] = {
            x: 9 * box,
            y: 10 * box
        };
        this.food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        this.score = 0;
        this.direction = "LEFT";
        this.ctx = document.getElementById("snake").getContext("2d");
    }

    draw() {
        for (let i = 0; i < this.snake.length; i++) {
            this.ctx.fillStyle = (i == 0) ? "green" : "white";
            this.ctx.fillRect(this.snake[i].x, this.snake[i].y, box, box);
            this.ctx.strokeStyle = "red";
            this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, box, box);
        }
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.food.x, this.food.y, box, box);
        this.ctx.fillStyle = "white";
        this.ctx.font = "45px Changa one";
        this.ctx.fillText(this.score, 2 * box, 1.6 * box);
    }

    update() {
        let snakeX = this.snake[0].x;
        let snakeY = this.snake[0].y;

        if (snakeX == this.food.x && snakeY == this.food.y) {
            this.score++;
            this.food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
        } else {
            this.snake.pop();
        }

        if (this.direction == "LEFT") snakeX -= box;
        if (this.direction == "UP") snakeY -= box;
        if (this.direction == "RIGHT") snakeX += box;
        if (this.direction == "DOWN") snakeY += box;

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || this.collision(newHead, this.snake)) {
            clearInterval(game);
        }

        this.snake.unshift(newHead);
    }

}