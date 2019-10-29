import {
    TWO_PI,
    ellipseCoord,
    translate,
    normalize,
    random,
    randomSelect,
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
            const thickness = 11;
            const numStrokes = 7;
            this.squiggle(
                { x: 0, y: thickness },
                { x: width * 0.6, y: height * 0.75 },
                thickness,
                numStrokes,
                "hsla(360, 50%, 50%, 0.5)",
                -1
            );
            this.squiggle(
                { x: thickness / 2, y: height * 0.11 },
                { x: width * 0.6, y: height * 0.75 },
                thickness,
                numStrokes,
                "hsla(200, 50%, 50%, 0.5)",
                1
            );
        });
    }

    squiggle(pos, size, thickness, numStrokes, color, dir = 1) {
        const { ctx, width, height } = this;
        ctx.setStyles({ stroke: color });

        const r = size.y / numStrokes;
        let s;
        let e;
        for (let i = 0; i < numStrokes; i++) {
            const h = (i / numStrokes) * size.y;
            s = {
                x: r + pos.x,
                y: h + pos.y
            };
            e = {
                x: size.x - r + pos.x,
                y: h + pos.y
            };

            if (i == 0) {
                if (dir != 1) {
                    ctx.thickLine(s.x, s.y, e.x + r / 2, e.y, thickness);
                } else {
                    ctx.thickLine(s.x - r / 2, s.y, e.x, e.y, thickness);
                }
            } else {
                if (i == numStrokes - 1) {
                    if (dir != 1) {
                        ctx.thickLine(s.x - r / 2, s.y, e.x, e.y, thickness);
                    } else {
                        ctx.thickLine(s.x, s.y, e.x + r / 2, e.y, thickness);
                    }
                } else {
                    ctx.thickLine(s.x, s.y, e.x, e.y, thickness);
                }
                if (dir == 1 ? i % 2 == 0 : i % 2 == 1) {
                    ctx.thickArc(
                        s.x,
                        s.y - r / 2,
                        r / 2,
                        r / 2,
                        Math.PI * 0.5,
                        -Math.PI * 0.5,
                        thickness
                    );
                } else {
                    ctx.thickArc(
                        e.x,
                        e.y - r / 2,
                        r / 2,
                        r / 2,
                        -Math.PI * 0.5,
                        Math.PI * 0.5,
                        thickness
                    );
                }
            }
        }
    }
    save() {
        this.ctx.save();
    }
}
