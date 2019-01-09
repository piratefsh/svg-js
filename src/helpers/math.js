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

function translate({ x, y }, { x: xt, y: yt }) {
    return {
        x: x + xt,
        y: y + yt
    };
}

function rotate({ x, y }, theta = 0, origin) {
    if (origin) {
        return translate(
            rotate(
                translate(
                    { x, y },
                    {
                        x: -origin.x,
                        y: -origin.y
                    }
                ),
                theta
            ),
            origin
        );
    }
    return {
        x: x * Math.cos(theta) - y * Math.sin(theta),
        y: y * Math.cos(theta) + x * Math.sin(theta)
    };
}


export { random, radians, polarToCartesian, rotate, translate };
