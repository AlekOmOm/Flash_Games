



export function processUserInput(e, keyMapping) {
    return matchInput(e.key, keyMapping);
}

function matchInput (input, keyMapping) {
    console.log("input: ", input);

    for (let key in keyMapping) {
        if (key === input) {
            console.log("keyMapping[key]: ", keyMapping[key]);
            return parseInt(keyMapping[key]);
        }
    }
    return null;
}