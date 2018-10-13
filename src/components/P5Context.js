import P5 from "p5";
import ContextInterface from "./ContextInterface";

export default class P5Context extends ContextInterface {
    instantiate(parentNode) {
        this.instance = new P5(this.setup, parentNode);
    }

    p5Fn(instance) {
        /* eslint-disable no-param-reassign */
        instance.draw = this.draw;
        instance.setup = (p) => {
            p.createCanvas(this.width, this.height);
            p.background(220);
        };
        /* eslint-enable no-param-reassign */
    }

    line(...args) {
        this.instance.line(...args);
    }

    ellipse(...args) {
        this.instance.ellipse(...args);
    }

    setStyles(styles) {
        this.instance.stroke(styles.stroke);
        this.instance.strokeWeight(styles.strokeWidth || styles.strokeWeight);
        this.instance.fill(styles.fill);
    }
}
