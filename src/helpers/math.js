function random(start, end) {
    return Math.random() * (end - start) + start;
}

function radians(deg) {
    return (deg / 180) * Math.PI;
}

function polarToCartesian(rx, ry, rad) {
    return {
        x: rx * Math.cos(rad),
        y: ry * Math.sin(rad)
    };
}

export { random, radians, polarToCartesian };
