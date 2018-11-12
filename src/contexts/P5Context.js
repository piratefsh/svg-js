import P5 from "p5";
import ContextInterface from "./ContextInterface";

export default class P5Context extends ContextInterface {
    p5Functions(p) {
        this.p5renderer = p;
        /* eslint-disable no-param-reassign */
        p.draw = this.drawFn;
        p.setup = () => {
            p.createCanvas(this.width, this.height);
            p.noLoop();
        };
        /* eslint-enable no-param-reassign */
    }

    draw(drawFn) {
        this.drawFn = drawFn;

        // instantiate on draw instead of in constructor
        // is is because p5 needs draw function on instantiation
        this.instance = new P5(this.p5Functions.bind(this), this.parentNode);
    }

    save() {
        this.p5renderer.saveCanvas(this.saveFileName());
    }

    line(...args) {
        this.instance.line(...args);
    }

    ellipse(width, height, x, y) {
        this.instance.ellipse(x, y, width, height);
    }

    rect(width, height, x, y) {
        this.instance.rect(x, y, width, height);
    }

    arc(x, y, radX, radY, start, stop) {
        this.instance.arc(x, y, radX*2, radY*2, start, stop);
    }

    point(x, y) {
        this.instance.point(x, y);
    }

    setStyles(styles) {
        const { stroke, strokeWidth, strokeWeight, fill } = styles;
        if (stroke) this.instance.stroke(stroke);
        if (strokeWidth || strokeWeight)
            this.instance.strokeWeight(strokeWidth || strokeWeight);
        if (fill) this.instance.fill(fill);
    }

    getDOMElement() {
        return this.parentNode;
    }
}
