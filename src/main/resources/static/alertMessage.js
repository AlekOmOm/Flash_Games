


function toStringSnake(snake) {
    let str = "";
    for (let i = 0; i < snake.length; i++) {
        str += "(" + snake[i][0] + "," + snake[i][1] + ")";
    }
    return str;
}