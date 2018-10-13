function random(start, end) {
    return Math.random() * (end - start) + start;
}

function radians(deg) {
    return (deg / 180) * Math.PI;
}

export { random, radians };
