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
            this.kochTessel({x: width/2, y: height/2}, width/3 - 40, 1, 1);
        });
    }

    kochTessel(center, radius, depth = 1, levels=1) {
        const TWO_PI = 2 * Math.PI;
        const PI = Math.PI;
        const THIRD_TWO_PI = TWO_PI/3;

        const parentLen = radius/Math.sin(PI/3/2) * Math.sin(THIRD_TWO_PI);
        
        const tileArea = (Math.sqrt(3) / 4) * Math.pow(parentLen, 2);
        const childTileArea = tileArea / 3;
        const len = Math.sqrt((4 * childTileArea) / Math.sqrt(3));

        if (depth == 0) {
            this.kochSnowflake(
                center,
                radius,
                Math.PI / 6,
                levels
            );
        } else {
            for (let i = 0; i < 6; i++) {
                const theta = Math.PI / 6 + (i / 6) * Math.PI * 2;
                const lenToRad = len/Math.sin(THIRD_TWO_PI) * Math.sin(PI/3 / 2)
                this.kochTessel(
                    translate({
                        x: radius * Math.sin(theta),
                        y: radius * Math.cos(theta)
                    }, center),
                    lenToRad,
                    depth - 1
                );
            }
        }
    }

    kochSnowflake(center, radius, offsetRot = 0, levels=1) {
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

            this.kochCurve(start, end, levels, 1);
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
