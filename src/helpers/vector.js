function sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

function cross(a, b) {
    return a.x * b.y - a.y * b.x;
}

function div(a, b) {
    return { x: a.x / b, y: a.y / b };
}

function mult(a, b) {
    return { x: a.x * b, y: a.y * b };
}

function eq(a, b){
    return Math.trunc(a.x) === Math.trunc(b.x) && Math.trunc(a.y) === Math.trunc(b.y);
}

// Find intersection of two line segments
// https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
function intersection(s1, e1, s2, e2) {
    const p = s1;
    const r = sub(e1, s1);
    const q = s2;
    const s = sub(e2, s2);

    const t = cross(sub(q, p), s) / cross(r, s);
    const u = cross(sub(q, p), r) / cross(r, s);

    const left = add(p, mult(r, t));
    const right = add(q, mult(s, u));
    if (eq(left, right) &&  cross(r, s) !== 0 && (t <= 1 && t >= 0) && (u <= 1 && u >= 0)) {
        // has intersection
        return add(p, mult(r, t));
    }

    return false;
}

export { sub, cross, div, mult, intersection };
