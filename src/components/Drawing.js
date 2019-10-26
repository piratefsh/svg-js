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
            const num = 30;
            ctx.rect(width - 1, height - 1, 1, 1);
            grid2d(
                width - gutter,
                height - gutter,
                num,
                1,
                (x, y, cx, cy, i, j) => {
                    if (i == 0) {
                        return;
                    }
                    ctx.thickLine(
                        x + gutter / 2,
                        y + gutter / 2,
                        x + gutter / 2,
                        y + cy + gutter / 2, 2
                    );
                }
            );
        });
    }
    save() {
        this.ctx.save();
    }
}
