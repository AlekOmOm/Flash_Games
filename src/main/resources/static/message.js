
export function message(element, message, color, resetColor, timeout) {
    element.textContent = message;
    element.style.color = color;
    setTimeout(() => {
        // TODO: set new highscore message as fixed until game over
        element.textContent = "";
        element.style.color = resetColor; // reset color
    }, timeout);
}