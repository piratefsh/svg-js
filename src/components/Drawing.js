import { grid2d } from "../helpers/grids";

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
            grid2d(20, 20, width, height, (x, y, cx, cy) => {
                ctx.ellipse(2, 2, x, y)
            })
        });
    }
    save() {
        this.ctx.save();
    }
}
