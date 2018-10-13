import P5 from "p5";
import ContextInterface from "./ContextInterface";

export default class P5Context extends ContextInterface {
    instantiate() {
    }

    p5Functions(currInstance) {
        /* eslint-disable no-param-reassign */
        currInstance.draw = this.drawFn;
        currInstance.setup = () => {
            currInstance.createCanvas(this.width, this.height);
            currInstance.noLoop();
        };
        /* eslint-enable no-param-reassign */
    }

    draw(drawFn) {
        this.drawFn = drawFn;
        this.instance = new P5(this.p5Functions.bind(this), this.parentNode);
    }

    line(...args) {
        this.instance.line(...args);
    }

    ellipse(width, height, x, y) {
        this.instance.ellipse(x, y, width, height);
    }

    setStyles(styles) {
        this.instance.stroke(styles.stroke);
        this.instance.strokeWeight(styles.strokeWidth || styles.strokeWeight);
        this.instance.fill(styles.fill);
    }
}
