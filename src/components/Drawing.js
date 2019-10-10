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
            const numLines = 10;
            const step = width / numLines;
            const offsetX = step/2;
            const maxThickness = 16;
            const minThickness = 1;
            const rows = 10;
            for (let i = 0; i < numLines; i++) {
                for(let j = 0; j < rows; j++){
                    const s1 = translate({
                        x: i * step,
                        y: 0,
                    }, {x: 0, y: height/rows*j})
                    const e1 = translate({
                        x: i * step,
                        y: height/rows,
                    }, {x: 0, y: height/rows*j})
                    this.thiccLine(
                        s1.x + step*(j/rows), s1.y, e1.x + step*(j/rows), e1.y, minThickness + maxThickness - Math.sin(1.3*j/rows * i/numLines*Math.PI)* (maxThickness-minThickness)
                    );
                }

            }
        });
    }

    thiccLine(sx, sy, ex, ey, lineWidth = 1) {
        lineWidth = Math.trunc(lineWidth)
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const offset = mult(vec, i - Math.floor(lineWidth / 2))
            const st = translate(
                { x: sx, y: sy },
                offset
            );
            const en = translate(
                { x: ex, y: ey },
                offset
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
