const TWO_PI = Math.PI * 2;
const THIRD_TWO_PI = TWO_PI / 3;

function random(start, end) {
    return Math.random() * (end - start) + start;
}

function randomSelect(arr) {
    return arr[Math.floor(random(0, arr.length))];
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

function normalize({ x, y }) {
    const mag = dist({ x: 0, y: 0 }, { x, y });
    return { x: x / mag, y: y / mag };
}

function dist(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
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
