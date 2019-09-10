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
        const wbtOptions = ['3459ABFGHLMNRSTXYZ', '012678CDEIJKOPQUVW6789ABIJKLMNUVWXYZ', '012345CDEFGHOPQRST']

        ctx.draw(() => {
            const pr = 3;
            xl(canvas, [1, 1], 3000, "0Y1Y2Y3Y4Y5Y6Y7Y8Y9YAYBYCYDYEYFYHYIYJYKYLYMYNY");
            axl(canvas, [1, 1], [1, 2, 3, 4], "ABRL", "UVWXY", pr, "0Z1Z2Z3Z4Z5Z6Z7Z8Z9ZAZBZCZDZEZFZHZIZJZKZLZMZNZ")
            xl(canvas, [1, 1], 1, "00123456789ABCDEFGHIJKLMNOPQRSTUVWXY");

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
