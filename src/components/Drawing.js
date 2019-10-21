import { mult, midpoint, triangleCentroid } from "../helpers/math";

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
            const iters = 2;
            this.sub(
                [{ x: 0, y: len }, { x: 0, y: 0 }, { x: len, y: 0 }],
                iters
            );
            // this.sub(
            //     [{ x: 0, y: len }, { x: len, y: len }, { x: len, y: 0 }],
            //     iters
            // );
        });
    }

    sub(pos, iters = 1) {
        const { ctx } = this;
        const [p1, p2, p3] = pos;
        ctx.startLine();
        pos.forEach(p => ctx.lineVertex(p.x, p.y));
        ctx.endLine();

        const sub1 = [p1, midpoint(p1, p3), p2];
        const sub2 = [p2, midpoint(p1, p3), p3];
        const c1 = triangleCentroid(...sub1);
        const c2 = triangleCentroid(...sub2);
        const { x: c1x, y: c1y } = c1;
        const { x: c2x, y: c2y } = c2;
        ctx.ellipse(5, 5, c1x, c1y);
        ctx.ellipse(10, 10, c2x, c2y);
        if (iters == 0) {
            ctx.line(c1x, c1y, c2x, c2y);
            console.log(pos, iters, c1, c2)
            return [c1, c2];
        } else {
            // ctx.line(c1x, c1y, c2x, c2y)
            const res1 = this.sub(sub1, iters - 1);
            const res2 = this.sub(sub2, iters - 1);
            if (res1 && res2) {
                const [_, s] = res1;
                const [e, __] = res2;
                ctx.line(s.x, s.y, e.x, e.y);
            } else {
                return [c1, c2];
            }
            console.log(pos, iters, 'no return', res1, res2)
        }
    }

    save() {
        this.ctx.save();
    }
}
