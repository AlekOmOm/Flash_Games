



export function processUserInput(e, returnValues) {
    return matchInput(e.key, returnValues);
}

function matchInput (input, returnValues) {
    if (input in returnValues) {
        sessionStorage.setItem("gameStarted", "true");
        return returnValues[input];
    }

}