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
            this.sqFractal(width / 2, height / 2, width - width / 2);
        });
    }

    static sqCornerPoints(ix, iy, size) {
        const s = size;
        const x = ix - size;
        const y = iy + size;
        const hyp = Math.sqrt(Math.pow(size / 2, 2) + Math.pow(s / 4, 2));
        return [
            {
                x,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s - s / 2
            },
            {
                x: x - s / 2 + s + s / 2,
                y: y - s / 2 + s - s / 2 - hyp
            },
            {
                x: x - s / 2 + s + s,
                y: y - s / 2 + s - s / 2
            }
        ];
    }

    sqFractal(x, y, size) {
        const { ctx } = this;
        ctx.crect(size, size, x, y);
        if (size < 50) {
            return;
        }
        // draw sq for each corner
        const s = size / 2;
        ctx.setStyles({ stroke: "blue", strokeWidth: 4 });
        ctx.startLine();

        Drawing.sqCornerPoints(x, y, size / 2).forEach(({ x, y }) => {
            ctx.lineVertex(x, y);
        });
        ctx.endLine();
        ctx.setStyles(this.styles);
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
