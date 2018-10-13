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

    saveFileName() {
      return `${this.constructor.name}-${new Date()}`;
    }
}