import { translate, normalize, rotate, mult } from "../helpers/math";

export default class ContextInterface {
    constructor(parentNode, width, height) {
        this.instance = null;
        this.styles = {};

        this.parentNode = parentNode;

        /* eslint-disable no-plusplus */
        this.parentNode.id = `${
            this.constructor.name
        }-${ContextInterface.COUNTER++}`;

        this.width = width;
        this.height = height;
        this.instantiate(parentNode);
    }

    /* eslint-disable class-methods-use-this */
    instantiate(options) {
        return `instantiate ${options}`;
    }

    animate() {
        return "animate";
    }

    line() {
        return "line";
    }

    ellipse() {
        return "ellipse";
    }

    point() {
        return "point";
    }

    rect() {
        return "rect";
    }

    crect() {
        // same as rect, but position passed in is used as center
        return "crect";
    }

    arc() {
        return "arc";
    }

    startLine() {
        return `startLine`;
    }

    endLine() {
        return `endLine`;
    }

    endBezier() {
        return `endBezier`;
    }

    bezierVertex(x, y) {
        return `bezierVertex ${x}, ${y}`;
    }

    saveFileName() {
        return `${this.constructor.name}-${new Date()}`;
    }

    /**
        Draw takes in a function that is run to draw on the context.
        Has to be a function due to weird way that p5 is instantiate
    */
    draw(fn) {
        fn();
    }

    getDOMElement() {
        return null;
    }

    thickLine(sx, sy, ex, ey, lineWidth = 1) {
        lineWidth = Math.trunc(lineWidth);
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const offset = mult(vec, i - Math.floor(lineWidth / 2));
            const st = translate({ x: sx, y: sy }, offset);
            const en = translate({ x: ex, y: ey }, offset);
            this.line(st.x, st.y, en.x, en.y);
        }
    }

    thickDot(x, y, size = 1) {
        for (let i = 0; i < size; i++) {
            this.ellipse(i, i, x, y);
        }
    }

    thickArc(x, y, rx, ry, s, e, size = 1) {
        const rad = Math.floor(size / 2);
        for (let i = 0; i < size; i++) {
            this.arc(x, y, rx - rad + i, ry - rad + i, s, e);
        }
    }
}

ContextInterface.COUNTER = 0;
