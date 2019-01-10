import { Noise } from "noisejs";
import { intersection } from "../helpers/vector";

export default class Drawing {
    constructor({ styles, ctx, width, height, seed, time }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(300, 80%, 50%, 0.7)",
                strokeWidth: 1,
                fill: "hsla(100, 100%, 100%, 0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.lineStep = 20;
        this.numLines = this.height / this.lineStep;
        this.seed = seed;
        this.time = time;
    }

    vertical() {
        const fn = (x, y, t) => {
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
                // ctx.ellipse(2, 2, x, y)
            }
            ctx.polyline(points);
        }
    }

    draw() {
        const noise = new Noise(this.seed);
        const { ctx, width, height } = this;

        const fn = (r, theta, t) => {
            const shift = noise.simplex3(r / 90, Math.sin(theta), t);
            return {
                radius: r + Math.sin(shift) * 26,
                theta: theta + shift - Math.PI / 4
            };
        };
        ctx.draw(() => {
            // background
            // ctx.setStyles({ fill: "hsla(300, 80%, 90%, 0.7)" });
            // ctx.rect(width, height, 0, 0);

            ctx.setStyles(this.styles);

            for (let r = 10; r < width / 2 + 90; r += this.lineStep) {
                // this.lineStep += 0.02
                const points = [];
                const offset = (r / width) * Math.PI;
                const rstep = 0.05;
                for (
                    let t = offset;
                    t < Math.PI * 2 + offset + rstep;
                    t += rstep
                ) {
                    const { x, y, radius, theta } = fn(r, t, this.time);
                    const cx = radius * Math.sin(theta);
                    const cy = radius * Math.cos(theta);
                    points.push({ x: cx + width / 2, y: cy + height / 2 });
                }

                let segment = [];
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
                        [
                            [{ x: 0, y: 0 }, { x: width, y: 0 }],
                            [{ x: width, y: 0 }, { x: width, y: height }],
                            [{ x: width, y: height }, { x: 0, y: height }],
                            [{ x: 0, y: height }, { x: 0, y: 0 }]
                        ].forEach(ln => {
                            const [ls, le] = ln;

                            // before segment
                            const insb = intersection(ls, le, ss, se);
                            if (insb) {
                                segment.push(insb);
                                ctx.ellipse(5, 5, insb.x, insb.y);
                            }

                            // after segment
                            const insa = intersection(ls, le, se, sa);
                            if (insa) {
                                console.log(insa)
                                segment.push(insa);
                                ctx.ellipse(5, 5, insa.x, insa.y);
                            }
                        });

                        if (segment.length > 0) {
                            ctx.polyline(segment);
                            segment = [];
                        } else if (segment.length === 1) {
                            console.log(segment[0])
                        } else{
                            segment = [];
                        }
                    }
                }
                ctx.polyline(segment);
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
