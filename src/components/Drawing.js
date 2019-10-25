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
            const gutter = 60;
            const num = 40;
            ctx.rect(width - 1, height - 1, 1, 1);
            grid2d(width-gutter, height-gutter, num, num, (x, y, cx, cy) => {
                ctx.ellipse(2, 2, x + cx / 2 + gutter/2, y + cy / 2 + gutter/2);
            });
        });
    }
    save() {
        this.ctx.save();
    }
}
