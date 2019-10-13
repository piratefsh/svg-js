import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    mult,
    normalize
} from "../helpers/math";
import { grid2d } from "../helpers/grids";

const debug = false;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const THIRD_TWO_PI = TWO_PI / 3;
const ROOT_2 = 1.414;
export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(340, 100%, 50%, 1)",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles({ strokeWidth: 0, fill: "hsla(350, 50%, 10%, 1)" });
            // ctx.rect(width, height, 0, 0);
            ctx.setStyles(styles);
            this.kochTessel(
                { x: width / 2, y: height / 2 },
                this.chordToRad(width / 3),
                2,
                3
            );
        });
    }

    radToChord(radius, theta = THIRD_TWO_PI) {
        return 2 * radius * Math.sin(theta / 2);
    }

    chordToRad(len, theta = THIRD_TWO_PI) {
        return len / (2 * Math.sin(theta / 2));
    }

    equiTriangleHeight(len) {
        return Math.sqrt(len * len - Math.pow(len / 2, 2));
    }

    arcHeight(r, c) {
        return r - w * math.sin();
    }

    kochTessel(
        center,
        radius,
        depth = 1,
        iters = 1,
        i = 2,
        offsetRot = Math.PI / 6
    ) {
        if (debug) {
            this.ctx.ellipse(2, 2, center.x, center.y);
            this.ctx.ellipse(radius * 2, radius * 2, center.x, center.y);
        }

        if (depth == 0) {
            if (debug) {
                return;
            }
            this.kochSnowflake({
                center,
                radius: this.equiTriangleHeight(radius),
                offsetRot: offsetRot + Math.PI / 6,
                iters
            });
        } else {
            const childRad = radius * (2 - ROOT_2);
            for (let i = 0; i < 6; i++) {
                const theta = offsetRot + (i * Math.PI) / 3;
                // unsure why minus 1 here, might be something to do with line calcs
                const spoke = radius - 1;
                const pos = translate(
                    {
                        x: spoke * Math.sin(theta),
                        y: spoke * Math.cos(theta)
                    },
                    center
                );

                // this.ctx.line(pos.x, pos.y, center.x, center.y)
                this.kochTessel(
                    pos,
                    childRad,
                    depth - 1,
                    iters,
                    i,
                    offsetRot + Math.PI / 6
                );
            }
        }
    }

    kochSnowflake({ center, radius, offsetRot, iters, lineWidth = 1 }) {
        const points = [];
        const num = 3;
        // this.ctx.ellipse(radius*2, radius*2, center.x, center.y)
        for (let i = 0; i < num; i++) {
            const theta = offsetRot + (-i / num) * Math.PI * 2;
            points.push(
                translate(
                    {
                        x: radius * Math.sin(theta),
                        y: radius * Math.cos(theta)
                    },
                    center
                )
            );
        }

        points.forEach((start, i) => {
            const end = points[i + 1 > points.length - 1 ? 0 : i + 1];

            this.kochCurve({ start, end, iters, lineWidth });
        });
    }

    kochCurve({ start, end, iters = 3, lineWidth = 1 }) {
        const len = {
            x: (end.x - start.x) / 3,
            y: (end.y - start.y) / 3
        };

        const { ctx } = this;
        if (iters == 0) {
            this.thiccLine(start.x, start.y, end.x, end.y, lineWidth);
        } else {
            this.kochCurve({
                start,
                end: translate(start, len),
                iters: iters - 1,
                lineWidth
            });
            this.kochCurve({
                start: translate(start, len),
                end: translate(rotate(len, -Math.PI / 3), translate(start, len)),
                iters: iters - 1,
                lineWidth
            });

            this.kochCurve({
                start: translate(rotate(len, -Math.PI / 3), translate(start, len)),
                end: translate(start, mult(len, 2)),
                iters: iters - 1,
                lineWidth
            });
            this.kochCurve({
                start: translate(start, mult(len, 2)),
                end: end,
                iters: iters - 1,
                lineWidth
            });
        }
    }

    thiccLine(sx, sy, ex, ey, lineWidth = 1) {
        lineWidth = Math.trunc(lineWidth);
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const offset = mult(vec, i - Math.floor(lineWidth / 2));
            const st = translate({ x: sx, y: sy }, offset);
            const en = translate({ x: ex, y: ey }, offset);
            this.ctx.line(st.x, st.y, en.x, en.y);
        }
    }

    thiccDot(x, y, size) {
        for (let i = 0; i < size; i++) {
            this.ctx.ellipse(i, i, x, y);
        }
    }

    save() {
        this.ctx.save();
    }
}
