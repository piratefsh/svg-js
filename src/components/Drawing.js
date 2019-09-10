import { axl, xl, wbt, get } from "./explor";

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

        this.fillStyle = {
            fill: "hsla(200, 50%, 80%, 0.3)",
            strokeWidth: 0
        };
    }

    draw() {
        const { ctx, width, height, styles } = this;
        const canvas = new Uint8Array(width * height);
        canvas.width = width;
        canvas.height = height;
        canvas.fill("0".charCodeAt(0))
        ctx.animate(true);
        const wbtOptions = ['ABCD', '0123', 'WXYZ']

        ctx.draw(() => {
            xl(canvas, [1, 1], 1, "0W");
            axl(
                canvas,
                [1, 1],
                [2, 3, 4],
                "RNEAB",
                "ABCD",
                5,
                "WA"
            );
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const px = get(canvas, y * width + x);
                    ctx.setStyles({
                        stroke: wbt(px, ...wbtOptions)
                    });
                    ctx.point(x, y);
                }
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
