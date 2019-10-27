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
            const len = 20;
            const numStrokes = 1400;
            for (let i = 0; i < numStrokes; i++) {
                const s = {
                    x: random(0, width),
                    y: random(0, height)
                };
                const e = translate(s, {
                    x: randomSelect([0, -len, len]),
                    y: randomSelect([-len, 0, len])
                });

                if(s.x < 0 || s.x > width || s.y < 0 || s.y > height ||
                    e.x < 0 || e.x > width || e.y < 0 || e.y > height){
                    continue
                }

                ctx.thickLine(s.x, s.y, e.x, e.y, 1);
            }
        });
    }
    save() {
        this.ctx.save();
    }
}
