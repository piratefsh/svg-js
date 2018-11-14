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

function vadd(v1, v2) {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
    };
}

export { random, radians, polarToCartesian, vadd };
