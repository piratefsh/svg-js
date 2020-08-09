import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    mult,
    normalize,
    equiTriangleHeight,
    chordToRad
} from "../helpers/math";
import { grid2d } from "../helpers/grids";

const debug = false;

const DRAW_BG = true;
const ALLOW_OVERLAP = true;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const THIRD_TWO_PI = TWO_PI / 3;
const ROOT_2 = Math.sqrt(2);

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(340, 100%, 50%, 0.4)",
                strokeWidth: 2,
                fill: "rgba(0, 0, 0, 0.0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.cache = new Set();
    }

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            if (DRAW_BG) {
                ctx.setStyles({
                    strokeWidth: 0,
                    fill: "hsla(350, 50%, 10%, )"
                });
                ctx.rect(width, height, 0, 0);
            }
            ctx.setStyles(styles);
            this.kochTessel2(
                { x: width / 2, y: height / 2 },
                chordToRad(width / 3, THIRD_TWO_PI),
                3,
                3
            );
        });
    }

    kochTessel3(center, radius, depth = 1, iters = 1, i = 2) {
        const childRad = radius / 2;
        if (depth == 0) {
            this.kochSnowflake({
                center,
                radius,
                offsetRot: Math.PI / 6,
                iters
            });
        } else {
            for (let i = 0; i < 6; i++) {
                const theta = Math.PI / 6 + (i / 6) * TWO_PI;
                const spoke = radius;
                const pos = translate(
                    {
                        x: spoke * Math.sin(theta),
                        y: spoke * Math.cos(theta)
                    },
                    center
                );
                this.kochTessel3(pos, childRad, depth - 1, iters, i);
            }
        }
    }

    kochTessel2(center, radius, depth = 1, iters = 1, offsetRot = Math.PI / 6) {
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
                radius: equiTriangleHeight(radius),
                offsetRot: Math.PI / 6,
                iters
            });
        } else {
            const childRad = radius / Math.sqrt(3);
            for (let i = 0; i < 6; i++) {
                const theta = offsetRot + (i * Math.PI) / 3;
                const spoke = radius;
                const pos = translate(
                    {
                        x: spoke * Math.sin(theta),
                        y: spoke * Math.cos(theta)
                    },
                    center
                );

                this.kochTessel2(
                    pos,
                    childRad,
                    depth - 1,
                    iters,
                    offsetRot + Math.PI / 6
                );
            }
        }
    }

    getCacheId(center) {
        return `${Math.round(center.x)},${Math.round(center.y)}`;
    }

    inCache(center, err = 1) {
        // skip caching for overlap effect
        if (ALLOW_OVERLAP) return false;

        const id = this.getCacheId(center);
        const possNeibs = [
            center,
            translate(center, { x: 1, y: 0 }),
            translate(center, { x: -1, y: 0 }),
            translate(center, { x: 0, y: 1 }),
            translate(center, { x: 0, y: -1 }),
            translate(center, { x: 1, y: 1 }),
            translate(center, { x: 1, y: -1 }),
            translate(center, { x: -1, y: -1 }),
            translate(center, { x: -1, y: 1 })
        ];
        return (
            possNeibs.filter(neib => this.cache.has(this.getCacheId(neib)))
                .length > 0
        );
    }

    kochSnowflake({ center, radius, offsetRot, iters, lineWidth = 1 }) {
        if (this.inCache(center)) {
            return;
        }
        this.cache.add(this.getCacheId(center));

        const points = [];
        const num = 3;
        for (let i = 0; i < num; i++) {
            const theta = offsetRot + (-i / num) * TWO_PI;
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
                end: translate(
                    rotate(len, -Math.PI / 3),
                    translate(start, len)
                ),
                iters: iters - 1,
                lineWidth
            });

            this.kochCurve({
                start: translate(
                    rotate(len, -Math.PI / 3),
                    translate(start, len)
                ),
                end: translate(start, mult(len, 2)),
                iters: iters - 1,
                lineWidth
            });
            this.kochCurve({
                start: translate(start, mult(len, 2)),
                end,
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
