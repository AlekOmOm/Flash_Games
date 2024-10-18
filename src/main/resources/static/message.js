
export function message(element, message, color, resetColor, timeout) {
    element.textContent = message;
    element.style.color = color;
    setTimeout(() => {
        element.textContent = "";
        element.style.color = resetColor; // reset color
    }, timeout);
}