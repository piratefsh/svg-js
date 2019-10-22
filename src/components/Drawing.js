import { translate, midpoint, triangleCentroid } from "../helpers/math";

const PI = Math.PI;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(355, 90%, 70%, 0.7)",
            strokeWidth: 3,
            fill: "hsla(355, 90%, 10%, 1)",
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
            ctx.setStyles({ fill: this.styles.fill, strokeWidth: 0 });
            ctx.rect(width, height, 0, 0);
            ctx.setStyles(this.styles);
            const iters = 3;
            this.sierCurve(height - 40, iters, 1, {
                x: 20,
                y: 20
            });
        });
    }

    sierCurve(len, iters, lineWidth = 1, offset = { x: 0, y: 0 }) {
        const tri1 = [{ x: 0, y: len }, { x: 0, y: 0 }, { x: len, y: 0 }].map(
            p => translate(p, offset)
        );
        const tri2 = [
            { x: len, y: 0 },
            { x: len, y: len },
            { x: 0, y: len }
        ].map(p => translate(p, offset));

        // get points for each half of square recursively
        const half1 = this.sub(tri1, iters);
        const half2 = this.sub(tri2, iters);

        //combine points and draw
        const points = [...half1, ...half2];
        points.forEach((p, i) => {
            const n = points[(i + 1) % points.length];
            this.ctx.thickLine(p.x, p.y, n.x, n.y, lineWidth);
        });
    }

    // as described in https://www.youtube.com/watch?v=Ps9itT9KcdM
    sub(pos, iters = 1) {
        const [p1, p2, p3] = pos;
        const points = [];

        // find center of current triangle
        const centroid = triangleCentroid(...pos);
        if (iters == 0) {
            // if recursed all the way down, add point
            points.push(centroid);
        } else {
            // else, subdivide triangle into two right angle triangle
            // and add the points for each
            const sub1 = [p1, midpoint(p1, p3), p2];
            const sub2 = [p2, midpoint(p1, p3), p3];
            points.push(...this.sub(sub1, iters - 1));
            points.push(...this.sub(sub2, iters - 1));
        }

        return points;
    }

    save() {
        this.ctx.save();
    }
}
