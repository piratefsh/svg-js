export default class ContextInterface {
    constructor(parentNode, width, height) {
        this.instance = null;
        this.styles = {};

        this.parentNode = parentNode;
        this.parentNode.id = this.constructor.name;

        this.width = width;
        this.height = height;
        this.instantiate(parentNode);
    }

    instantiate(options) {
        return `instantiate ${options}`;
    }

    line() {
        return "line";
    }

    ellipse() {
        return "ellipse";
    }

    point(){
        return "point";
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

    getDOMElement(){
        return null;
    }
}