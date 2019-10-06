import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    normalize
} from "../helpers/math";
import { grid2d } from "../helpers/grids";



export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(195, 60%, 50%, 0.5)",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    kernel(x, y, rx, ry, cx, cy){
        const { ctx } = this;
        // ctx.ellipse(2, 2, x, y)
        ctx.arc(x, y, rx, ry, 0 + Math.PI/2, Math.PI + Math.PI/2)
        ctx.arc(x + cx/2, y, rx, ry, Math.PI + Math.PI/2, 0 + Math.PI/2)
        ctx.line(x, y - ry, x + cx/2, y - ry)
        ctx.line(x, y + ry, x + cx/2, y + ry)
    }

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            const gx = width
            const gy = height
            const nr = 8; //Math.floor(random(4, 6))
            const nc = nr * 2; //Math.floor(random(4, 6))
            const amp = random(0, 2)
            const margin = {x: 50, y: 50}

            ctx.setStyles({
                fill: 'hsl(10, 10%, 90%) ',
                stroke: 'none'
            });

            ctx.setStyles(styles);
            grid2d(gx, gy, nr, nc, (x, y, cx, cy, i, j) => {
                const rx = cx/4;
                const ry = cy/2;
                x+=rx
                y+=ry
                const rings = random(1, cy/2)
                for(let i = 0; i < rings/2; i++){
                    const step = i
                    this.kernel(x + 0.5*step, y, rx - 2*step, ry - 2*step, cx - 2*step, cy - 2*step)
                }
            });
        });
    }

    save() {
        this.ctx.save();
    }
}
