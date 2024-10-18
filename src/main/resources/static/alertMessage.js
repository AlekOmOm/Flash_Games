
// ----------------- Game Over logic -----------------
export function gameOver(snake, board) {

    let snakeX = snake[0][0];
    let snakeY = snake[0][1];

    if (sessionStorage.getItem("gameOver") === "true") {
        return true;
    }

    // Check if the snake is out of bounds
    if (snakeX < 0 ||snakeY < 0 || snakeX > board.width || snakeY > board.height){
        alert("Game over! You collided with the wall!");
        sessionStorage.setItem("gameOver", "true");
        console.log("game over, snake position: (" + snakeX + "," + snakeY+ "), board: (" + board.width + "," + board.height + ")");
        return true;
    }
    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i][0] && snakeY === snake[i][1]) {
            alert("Game over! You collided with yourself!");
            sessionStorage.setItem("gameOver", "true");
            return true;
        }
    }
    return false;
}