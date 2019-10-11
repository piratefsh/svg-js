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

const PI = Math.PI;
const TWO_PI = 2 * PI;
const THIRD_TWO_PI = TWO_PI / 3;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "rgba(200, 0, 0, 0.5)",
                strokeWidth: 2,
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
            ctx.setStyles(styles);
            this.kochTessel(
                { x: width / 2, y: height / 2 },
                this.chordToRad(width/3),
                1,
                1
            );
        });
    }

    radToChord(radius, theta=THIRD_TWO_PI) {
        return 2 * radius * Math.sin(theta/2)
    }

    chordToRad(len, theta=THIRD_TWO_PI){
        return len / (2 * Math.sin(theta/2))

    }

    kochTessel(center, radius, depth = 1, iters = 1, i = 0) {
        this.ctx.ellipse(radius*2, radius*2, center.x, center.y);

        const parentLen = this.radToChord(radius);
        const tileArea = (Math.sqrt(3) / 4) * parentLen * parentLen;
        const childTileArea = tileArea / 3;
        const childLen = Math.sqrt((4 * childTileArea) / Math.sqrt(3));
        const childRad = this.chordToRad(childLen)
        if (depth == 0) {
            this.kochSnowflake({
                center,
                radius: radius * Math.sqrt(2),
                offsetRot: Math.PI / 6,
                iters
            });
        } else {
            for (let i = 0; i < 6; i++) {
                const theta = Math.PI / 6 + (i / 6) * Math.PI * 2;
                const rad = this.chordToRad(childLen);
                const spoke = radius + childRad
                const pos = translate(
                    {
                        x: spoke * Math.sin(theta),
                        y: spoke * Math.cos(theta)
                    },
                    center
                );
                this.kochTessel(pos, rad, depth - 1, iters, i);
            }
        }
    }

    kochSnowflake({ center, radius, offsetRot, iters }) {
        const points = [];
        const num = 3;
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

            this.kochCurve(start, end, iters, 1);
        });
    }

    kochCurve(start, end, iters = 3, lineWidth = 1) {
        const len = {
            x: (end.x - start.x) / 3,
            y: (end.y - start.y) / 3
        };

        const { ctx } = this;
        if (iters == 0) {
            this.thiccLine(start.x, start.y, end.x, end.y, lineWidth);
        } else {
            this.kochCurve(start, translate(start, len), iters - 1, lineWidth);
            this.kochCurve(
                translate(start, len),
                translate(rotate(len, -Math.PI / 3), translate(start, len)),
                iters - 1,
                lineWidth
            );

            this.kochCurve(
                translate(rotate(len, -Math.PI / 3), translate(start, len)),
                translate(start, mult(len, 2)),
                iters - 1,
                lineWidth
            );
            this.kochCurve(
                translate(start, mult(len, 2)),
                end,
                iters - 1,
                lineWidth
            );
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
