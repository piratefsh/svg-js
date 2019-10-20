import { mult, chordToRad, dist } from "../helpers/math";

const SQRT_2 = Math.sqrt(2);
const PI = Math.PI;
const TWO_PI = 2 * PI;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "black",
            strokeWidth: 1,
            fill: "rgba(0, 0, 0, 0.9)",
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
            this.sierCurve(len, pos, 4);
        });
    }

    sierSq(len, pos, offset = 0) {
        const sides = 4;
        const radius = chordToRad(len, TWO_PI / 4);
        const points = [];
        for (let i = 0; i < sides; i++) {
            const theta = offset + (i / sides) * TWO_PI;
            points.push({
                x: pos.x + radius * Math.sin(theta),
                y: pos.y + radius * Math.cos(theta)
            });
        }
        return points;
    }

    sierCurve(len, pos, iters = 1, rotation = PI / 4) {
        const points = this.sierSq(len, pos, rotation);
        points.forEach((p, i) => {
            const n = points[(i + 1) % points.length];
            this.ctx.line(p.x, p.y, n.x, n.y);
        });
        if (iters == 1) {
            return;
        }
        const childLen = (len / 4) * SQRT_2;

        const sides = 4;
        const r = len / SQRT_2;
        for (let i = 0; i < sides; i++) {
            const t = (i / sides) * TWO_PI + rotation;
            const childPos = {
                x: r * Math.sin(t) + pos.x,
                y: r * Math.cos(t) + pos.y
            };

            if (dist(childPos, pos) > 0) {
                this.sierCurve(
                    childLen,
                    childPos,
                    iters - 1,
                    rotation + PI / 4
                );
            }
        }
    }

    save() {
        this.ctx.save();
    }
}
