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

    animate(){
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
}

ContextInterface.COUNTER = 0;
