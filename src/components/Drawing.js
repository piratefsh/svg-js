import { Noise } from "noisejs";
import { intersection } from "../helpers/vector";

export default class Drawing {
    constructor({ styles, ctx, width, height, seed, time }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(340, 80%, 50%, 0.7)",
                strokeWidth: 1,
                fill: "hsla(100, 100%, 100%, 0)"
            },
            styles
        );
        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.lineStep = 5;
        this.radiusStep = 0.08;
        this.numLines = this.height / this.lineStep;
        this.seed = seed;
        this.time = time;
    }

    vertical() {
        const { ctx, width, height, numLines, lineStep } = this;
        const noise = new Noise(this.seed);

        const fn = (x, y) => {
            const shift = noise.simplex2(x / 150, y / 150);
            return {
                x: x + Math.sin(x / width) * shift * 50,
                y: y + Math.cos(shift) * 40
            };
        };
        for (let i = 0; i <= numLines; i++) {
            const a = i * lineStep - width / 2;
            const points = [];
            for (let j = 0; j <= numLines; j++) {
                const b = j * lineStep - height / 2;

                const { x, y } = fn(a, b, a * width + b);
                points.push({ x: x + width / 2, y: y + height / 2 });
            }
            ctx.polyline(points);
        }
    }

    radial() {
        const noise = new Noise(this.seed);

        const fn = (r, theta, t) => {
            const shift = noise.perlin3(r / 50, Math.sin(theta), t);
            return {
                radius: r + Math.sin(shift) * 20,
                theta: theta + shift * 1.2 - Math.PI / 4
            };
        };
        const { ctx, width, height } = this;

        ctx.setStyles(this.styles);

            const rstep = this.radiusStep;
            const offset = 0;
            for (let t = offset; t < Math.PI * 2 + offset; t += rstep) {
            const points = [];
        for (let r = 10; r < width * 0.9; r += this.lineStep) {
                const { radius, theta } = fn(r, t, this.time);
                const cx = radius * Math.sin(theta);
                const cy = radius * Math.cos(theta);
                points.push({ x: cx + width / 2, y: cy + height / 2 });
            }
            points.push({ x: points[0].x, y: points[0].y });

            let segment = [];

            // clip points to not draw beyond borders of canvas
            for (let i = 0; i < points.length; i++) {
                const { x, y } = points[i];
                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    segment.push({ x, y });
                } else {
                    // find any segment before or after point that will intersect border
                    const ss =
                        i > 0 ? points[i - 1] : points[points.length - 1];
                    const se = { x, y };
                    const sa =
                        i < points.length - 1 ? points[i + 1] : points[0];

                    this.findIntersections(segment, ss, se, sa);

                    if (segment.length === 1) {
                        // found after intersection, to be used as start of next segment
                        segment = [];
                    } else if (segment.length > 0) {
                        ctx.polyline(segment);
                        segment = [];
                    } else {
                        segment = [];
                    }
                }
            }
            ctx.polyline(segment);
        }
    }

    draw() {
        const { ctx } = this;

        ctx.draw(() => {
            this.radial();
        });
    }

    findIntersections(segment, bef, curr, aft) {
        const { width, height, ctx } = this;
        [
            [{ x: 0, y: 0 }, { x: width, y: 0 }],
            [{ x: width, y: 0 }, { x: width, y: height }],
            [{ x: width, y: height }, { x: 0, y: height }],
            [{ x: 0, y: height }, { x: 0, y: 0 }]
        ].forEach(ln => {
            const [ls, le] = ln;

            // before segment
            const insb = intersection(ls, le, bef, curr);
            if (insb) {
                segment.push(insb);
            }

            // after segment
            const insa = intersection(ls, le, curr, aft);
            if (insa) {
                segment.push(insa);
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
