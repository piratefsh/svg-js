import { xl } from './explor';

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
        canvas.fill(1)
        ctx.animate(true);

        ctx.draw(() => {
            xl(canvas, [2, 1], 3, {1: 255});
            for(let y = 0; y < height; y++){
                for(let x = 0; x < width; x++){
                    const hue = canvas[y * width + x];
                    ctx.setStyles({
                        fill: `hsla(${hue}, 80%, 50%, 1.0)`,
                        stroke: `hsla(${hue}, 80%, 50%, 1.0)`
                    })
                    ctx.point(x, y);
                }
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
