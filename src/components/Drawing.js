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
            const thickness = 17;
            const numStrokes = 7;
            this.squiggle(
                { x: 0, y: 0 },
                { x: width * 0.6, y: height * 0.75 },
                thickness,
                numStrokes,
                "hsla(360, 50%, 50%, 0.5)"
            );
            this.squiggle(
                { x: width * 0.15, y: height * 0.11 },
                { x: width * 0.6, y: height * 0.75 },
                thickness,
                numStrokes,
                "hsla(360, 50%, 50%, 0.5)"
            );
        });
    }

    squiggle(pos, size, thickness, numStrokes, color) {
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
            s.x + size.x - r * 2,
            s.y,
            s.x + size.x - r - r / 2,
            s.y,
            thickness
        );
    }
    save() {
        this.ctx.save();
    }
}
