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
                stroke: "black",
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
        const { ctx, styles } = this;
        ctx.setStyles(styles);
        ctx.draw(() => {
            const gx = this.width
            const gy = this.height
            const nr = 5
            const nc = 7

            grid2d(gx, gy, nr, nc, (x, y, cx, cy, i, j) => {
                let offset = 0;
                if (j % 2 == 0) {
                    offset = -cx / 2;
                    if (i == 0) {
                        ctx.setStyles({fill: 'red'})
                        cx /= 2;
                        offset = 0
                    } else if (i == (nr-1)) {
                        cx /= 2;
                        // offset = -cx/2;
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
                    10 + 30 *
                    (dist({ x: x + offset, y }, { x: 0, y: 0 }) /
                        dist(
                            { x: gx, y: gy },
                            { x: 0, y: 0 }
                        ));
                console.log(numLines);
                for (let i = 0; i < numLines; i++) {
                    const step = (cy / numLines) * i;
                    const gutter = 10;
                    const lx = offset + x ;
                    const ly = y + step;
                    ctx.line(lx + gutter, ly + gutter, lx + cx - gutter, ly - gutter);
                }
            });
        });
    }

    save() {
        this.ctx.save();
    }
}
