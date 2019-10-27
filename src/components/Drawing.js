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
            const thickness = 23;
            const len = 20;
            const numStrokes = 11;
            const r = height / numStrokes;
            let s;
            let e;
            for (let i = 0; i < numStrokes; i++) {
                const h = (i / numStrokes) * height;
                s = {
                    x: r,
                    y: h
                };
                e = {
                    x: width - r,
                    y: h
                };

                ctx.thickLine(s.x, s.y, e.x, e.y, thickness);

                if (i == 0) {
                    ctx.thickLine(s.x, s.y, s.x - r / 2, s.y, thickness);
                } else if (i % 2 == 0) {
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
            ctx.thickLine(
                s.x + width - r*2,
                s.y,
                s.x + width - r - r / 2,
                s.y,
                thickness
            );
        });
    }
    save() {
        this.ctx.save();
    }
}
