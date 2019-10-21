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

function mult({ x, y }, n) {
    return { x: x * n, y: y * n };
}

function radToChord(radius, theta = THIRD_TWO_PI) {
    return 2 * radius * Math.sin(theta / 2);
}

function chordToRad(len, theta = THIRD_TWO_PI) {
    return len / (2 * Math.sin(theta / 2));
}

function equiTriangleHeight(len) {
    return Math.sqrt(len * len - Math.pow(len / 2, 2));
}

export function triangleCentroid(a1, a2, a3) {
    const x = (a1.x + a2.x + a3.x) / 3;
    const y = (a1.y + a2.y + a3.y) / 3;
    return { x, y };
}

export function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
export {
    radToChord,
    chordToRad,
    equiTriangleHeight,
    mult,
    normalize,
    dist,
    random,
    radians,
    polarToCartesian,
    rotate,
    translate,
    randomSelect
};
