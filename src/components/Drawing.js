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
                strokeWidth: 2,
                fill: "rgba(0, 0, 0, 0.0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            const gx = width
            const gy = height
            const nr = Math.floor(random(4, 6))
            const nc = Math.floor(random(4, 6))
            const amp = random(0, 2)
            const margin = {x: 50, y: 50}

            ctx.setStyles({
                fill: 'hsl(10, 10%, 90%) ',
                stroke: 'none'
            });
            ctx.rect(width, height, 0, 0);

            ctx.setStyles(styles);
            grid2d(gx + (gx/nr) - margin.x * 2, gy - margin.y*2, nr, nc, (x, y, cx, cy, i, j) => {
                let offset = 0;
                if (j % 2 == 0) {
                    offset = -cx / 2;
                    if (i == 0) {
                        ctx.setStyles({fill: 'red'})
                        cx /= 2;
                        offset = 0
                    } else if (i == (nr-1)) {
                        cx /= 2;
                        ctx.setStyles({fill: 'green'})
                    }
                    else {
                        ctx.setStyles({fill: 'blue'})
                    }
                } else {
                    if (i == (nr-1)) {
                        return
                    }
                }
                // ctx.ellipse(3, 3, offset + x, y);
                // ctx.rect(cx, cy, x + offset, y);
                const numLines =
                    12 + 25 *
                    (dist({ x: x + offset, y }, { x: 0, y: 0 }) /
                        dist(
                            { x: gx, y: gy },
                            { x: 0, y: 0 }
                        ));


                for (let i = 0; i < numLines; i++) {
                    const step = (cy / numLines) * i;
                    const gutterx = 10 * Math.sin(i/numLines*Math.PI);
                    const guttery = 10 ;//* Math.cos(i/numLines*Math.PI * 0.2);
                    const lx = offset + x ;
                    const ly = y + step;

                    const start = translate({ x:lx + gutterx, y: ly + guttery }, margin)
                    const end = translate({ x: lx + cx - gutterx, y: ly - guttery}, margin)
                    ctx.line(start.x, start.y, end.x, end.y);
                }
            });
        });
    }

    save() {
        this.ctx.save();
    }
}
