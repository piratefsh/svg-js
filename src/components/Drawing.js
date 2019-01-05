export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.1)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, width, height, styles } = this;
        ctx.draw(() => {
            // ctx.setStyles({ fill: "#eee" });
            ctx.setStyles(styles);
            ctx.rect(width, height, 0, 0);
            this.sqFractal(width / 2, height / 2, width-(width/4));
        });
    }

    sqFractal(x, y, size) {
        const { ctx } = this;
        ctx.crect(size, size, x, y);
        if (size < 10) {
            return
        }
        // draw sq for each corner
        const s = size / 2;
        const shift = size / 2;
        this.sqFractal(x + shift, y + shift, s);
        this.sqFractal(x - shift, y + shift, s);
        this.sqFractal(x + shift, y - shift, s);
        this.sqFractal(x - shift, y - shift, s);
    }

    save() {
        this.ctx.save();
    }
}
