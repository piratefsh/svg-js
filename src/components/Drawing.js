import {
    TWO_PI,
    ellipseCoord,
    translate,
    normalize,
    random,
    rotate,
    mult
} from "../helpers/math";
export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(355, 90%, 70%, 0.7)",
            strokeWidth: 1,
            fill: "hsla(355, 90%, 10%, 0.0)",
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
            const numRings = 9;
            const granularity = 30;
            const size = { x: 20, y: 8 };
            const vel = { x: 0.1, y: -1.4 };
            const acc = { x: 0, y: 0.001 };
            const rvel = { x: 0.1, y: 0.03 };
            const racc = { x: 0.0045, y: 0.003 };
            const center = { x: width / 2, y: height - 50 };
            let prevPoint = { x: center.x, y: center.y + 50 };

            for (let j = 0; j < numRings; j++) {
                for (let i = 0; i < granularity; i++) {
                    const jitter = random(-0.05, 0.05);
                    const theta = (i / granularity) * TWO_PI + jitter;

                    const p = ellipseCoord(size.x, size.y, theta);
                    const pos = translate(p, center);

                    const perp = translate(
                        mult(normalize(p), (j / numRings) * 20),
                        pos
                    );
                    const thickness = (j / numRings) * 3 + 2;
                    ctx.thickLine(pos.x, pos.y, perp.x, perp.y, 2);
                    ctx.thickLine(prevPoint.x, prevPoint.y, pos.x, pos.y, 2);
                    ctx.thickDot(
                        perp.x,
                        perp.y,
                        thickness,
                        thickness,
                        thickness
                    );
                    center.x += vel.x;
                    center.y += vel.y;
                    size.x += rvel.x;
                    size.y += rvel.y;

                    rvel.x += racc.x;
                    rvel.y += racc.y;
                    vel.x += acc.x;
                    vel.y += acc.y;

                    prevPoint = pos;
                }
            }
        });
    }
    save() {
        this.ctx.save();
    }
}
