import { mult, chordToRad, dist } from "../helpers/math";

const SQRT_2 = Math.sqrt(2);
const PI = Math.PI;
const TWO_PI = 2 * PI;
const debug = true;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "black",
            strokeWidth: 1,
            fill: "rgba(0, 0, 0, 0.1)",
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
            const pos = mult({ x: width, y: height }, 0.5);
            const len = 150;
            ctx.startLine();
            this.sub(len, pos, 3);
            ctx.endLine();
        });
    }

    sub(len, pos, iters = 1, rot = PI / 2) {
        const { ctx } = this;

        const points = [];
        const egdes = [];
        const r = (len * SQRT_2) / 2;
        const sides = 4;
        for (let i = 0; i < sides; i++) {
            const t = (i / sides) * TWO_PI + rot;
            const p = {
                x: r * Math.sin(t - PI / 2) + pos.x,
                y: r * Math.cos(t - PI / 2) + pos.y
            };

            const e = {
                x: r * Math.sin(t + PI / 4) + pos.x,
                y: r * Math.cos(t + PI / 4) + pos.y
            };
            points.push(p);
            egdes.push(e);

            if (debug) {
                ctx.setStyles({ stroke: "pink" });
                ctx.line(pos.x, pos.y, e.x, e.y);
                ctx.setStyles(this.styles);
            }
        }

        if (iters == 1) {
            points.forEach(p => {
                ctx.lineVertex(p.x, p.y);
            });
        } else {
            egdes.forEach((p, i) => {
                ctx.ellipse(i * 5, i * 5, p.x, p.y);
                this.sub(len / 2, p, iters - 1, (TWO_PI / 4) * i + rot);
            });
        }
    }

    save() {
        this.ctx.save();
    }
}
