export function rndBool() {
    return Math.random() > 0.5;
}

export function rndInt(min, max) {
    return Math.round(min + (Math.random() * (max - min)));
}

export function rndChoice(arr, iterations = 1) {
    var list = arr.concat();
    var result = [];
    
    iterations = Math.min(list.length, iterations);

    for (let ix = iterations; ix--;) {
        result.push(list.splice(rndInt(0, list.length - 1), 1));
    }

    result = result.join(', ');

    return result;
}