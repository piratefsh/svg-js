import { mult, midpoint, triangleCentroid } from "../helpers/math";

const SQRT_2 = Math.sqrt(2);
const PI = Math.PI;
const TWO_PI = 2 * PI;
const debug = true;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(350, 80%, 70%, 0.7)",
            strokeWidth: 3,
            fill: "rgba(0, 0, 0, 0.0)",
            ...styles
        };

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, height } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            const len = height;
            const iters = 8;

            ctx.startLine();
            this.sub(
                [{ x: 0, y: len }, { x: 0, y: 0 }, { x: len, y: 0 }],
                iters
            );
            this.sub(
                [{ x: len, y: 0 }, { x: len, y: len }, { x: 0, y: len }],
                iters
            );
            ctx.endLine();
        });
    }

    sub(pos, iters = 1) {
        const { ctx } = this;
        const [p1, p2, p3] = pos;

        const centroid = triangleCentroid(...pos);
        if (iters == 0) {
            ctx.lineVertex(centroid.x, centroid.y);
        } else {
            const sub1 = [p1, midpoint(p1, p3), p2];
            const sub2 = [p2, midpoint(p1, p3), p3];
            this.sub(sub1, iters - 1);
            this.sub(sub2, iters - 1);
        }
    }

    save() {
        this.ctx.save();
    }
}
