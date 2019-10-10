import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    mult,
    normalize
} from "../helpers/math";
import { grid2d } from "../helpers/grids";

const perm = random(2, 3);
console.log(perm);
export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "orangered",
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

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(styles);
            const numLines = 17;
            const step = width / numLines;
            const offsetX = step/2;
            const thicx = 1.2
            for (let i = 0; i < numLines; i++) {
                this.thiccLine(
                    i * step,
                    (height / numLines) * i,
                    i * step,
                    height - (height / numLines) * i,
                    thicx * (numLines - (i > numLines/2 ? numLines - i+1 : 1 + i))
                );
                this.thiccLine(
                    offsetX + i * step,
                    i < numLines / 2
                        ? (height / numLines) * i
                        : height - (height / numLines) * i,
                    offsetX + i * step,
                    0,
                    thicx * i+1
                );

                this.thiccLine(
                    i * step - offsetX,
                    i > numLines / 2
                        ? (height / numLines) * i
                        : height - (height / numLines) * i,
                    i * step - offsetX,
                    height,
                    thicx * numLines - i+1
                );
            }
        });
    }

    thiccLine(sx, sy, ex, ey, lineWidth = 1) {
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const st = translate(
                { x: sx, y: sy },
                mult(vec, i - Math.floor(lineWidth / 2))
            );
            const en = translate(
                { x: ex, y: ey },
                mult(vec, i - Math.floor(lineWidth / 2))
            );
            this.ctx.line(st.x, st.y, en.x, en.y);
        }
    }

    thiccDot(x, y, size) {
        for (let i = 0; i < size; i++) {
            this.ctx.ellipse(i, i, x, y);
        }
    }

    save() {
        this.ctx.save();
    }
}
