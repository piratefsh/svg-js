import { mult, midpoint } from "../helpers/math";

const SQRT_2 = Math.sqrt(2);
const PI = Math.PI;
const TWO_PI = 2 * PI;
const debug = true;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(350, 80%, 50%, 0.3)",
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
        const { ctx, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            const len = height;
            const iters = 8;
            this.sub(
                [{ x: 0, y: len }, { x: 0, y: 0 }, { x: len, y: 0 }],
                iters
            );
            this.sub(
                [{ x: 0, y: len }, { x: len, y: len }, { x: len, y: 0 }],
                iters
            );
        });
    }

    sub(pos, iters = 1) {
        const { ctx } = this;
        const [p1, p2, p3] = pos;
        ctx.startLine();
        pos.forEach(p => ctx.lineVertex(p.x, p.y));
        ctx.endLine();

        if (iters == 1) {
            return;
        } else {
            this.sub([p1, midpoint(p1, p3), p2], iters - 1);
            this.sub([p2, midpoint(p1, p3), p3], iters - 1);
        }
    }

    save() {
        this.ctx.save();
    }
}
