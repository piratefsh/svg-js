import P5 from "p5";
import ContextInterface from "./ContextInterface";
import { rotate } from "../helpers/math";

/* eslint-disable no-underscore-dangle */

export default class P5Context extends ContextInterface {
    constructor(...args) {
        super(...args);
        this._bezierPoints = null;
        this._loop = false;
        this._cache = {};
    }

    p5Functions(p) {
        this.p5renderer = p;
        /* eslint-disable no-param-reassign */
        p.draw = this.drawFn;
        p.setup = () => {
            p.createCanvas(this.width, this.height);
            if (!this._loop) {
                p.noLoop();
            }
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

    animate(flag) {
        this._loop = flag;
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

    crect(width, height, x, y) {
        this.instance.rect(x - width / 2, y - height / 2, width, height);
    }

    arc(x, y, radX, radY, start, stop) {
        this.instance.arc(x, y, radX * 2, radY * 2, start, stop);
    }

    point(x, y) {
        this.instance.point(x, y);
    }

    startLine() {
        const { instance } = this;
        instance.beginShape(instance.LINE);
    }

    endLine() {
        const { instance } = this;
        instance.endShape();
    }

    lineVertex(x, y) {
        const { instance } = this;
        instance.vertex(x, y);
    }

    startBezier(x, y) {
        const { instance } = this;

        // throw error if starting new bezier before closing previous
        if (this._bezierPoints !== null) {
            throw Error(
                "startBezier: tried to start a new bezier curve before closing a previous one."
            );
        }

        instance.beginShape();
        instance.vertex(x, y);

        // keep track of points to calculate
        // continuous control points
        this._bezierPoints = [[x, y]];
    }

    endBezier() {
        if (this._bezierPoints === null) {
            throw Error(
                "endBezier: tried to end a bezier curve before starting one."
            );
        }

        this.instance.endShape();
        this._bezierPoints = null;
    }

    bezierVertex(...args) {
        const { instance, _bezierPoints } = this;

        if (args.length === 6) {
            instance.bezierVertex(...args);
        } else if (args.length === 4) {
            const [c2x, c2y, x, y] = args;
            // calculate continuous control point
            const prev = _bezierPoints[_bezierPoints.length - 1];

            // prev can either have 4 or 6 args, just want last 4
            if (prev.length >= 4) {
                const prevcx = prev[prev.length - 4];
                const prevcy = prev[prev.length - 3];
                const prevx = prev[prev.length - 2];
                const prevy = prev[prev.length - 1];
                // rotate normalized c2 by the end point by 180 deg
                const { x: cx, y: cy } = rotate(
                    {
                        x: prevcx - prevx,
                        y: prevcy - prevy
                    },
                    Math.PI
                );
                instance.bezierVertex(cx + prevx, cy + prevy, c2x, c2y, x, y);
            } else {
                // if missing first control point, use start point
                instance.bezierVertex(...prev, ...args);
            }
        } else {
            throw Error("bezierVertex: expected 4 or 6 arguments");
        }

        this._bezierPoints.push(args);
    }

    setStyles(styles) {
        const { stroke, strokeWidth, strokeWeight, fill } = styles;
        if (stroke) this.instance.stroke(this._fetchColor(stroke));
        if (strokeWidth || strokeWeight)
            this.instance.strokeWeight(strokeWidth || strokeWeight);
        if (fill) this.instance.fill(this._fetchColor(fill));
    }

    _fetchColor(color) {
        if (color) {
            if (color in this._cache) {
                return this._cache[color];
            }
            this._cache[color] = this.instance.color(color);
            return this._cache[color];
        }
    }

    getDOMElement() {
        return this.parentNode;
    }
}
