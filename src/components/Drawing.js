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

const PI = Math.PI;
const TWO_PI = 2 * PI;
const THIRD_TWO_PI = TWO_PI / 3;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "rgba(200, 0, 0, 0.5)",
                strokeWidth: 2,
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
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            grid2d(width, height, 8, 8, (x, y, cx, cy, i, j) => {
                if(i % 2 == 0) {
                    if(j % 2 == 0){
                        this.thiccArc(x, height-cy-y, cx, cy*2+5, 0, PI, 4)
                    } else {
                        this.thiccArc(x+cx, height-cy-y, cx, cy*2+5, 0, PI, 6, 3)
                    }
                }
            })
        });
    }

    thiccLine(sx, sy, ex, ey, lineWidth = 1) {
        lineWidth = Math.trunc(lineWidth);
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const offset = mult(vec, i - Math.floor(lineWidth / 2));
            const st = translate({ x: sx, y: sy }, offset);
            const en = translate({ x: ex, y: ey }, offset);
            this.ctx.line(st.x, st.y, en.x, en.y);
        }
    }

    thiccDot(x, y, size) {
        for (let i = 0; i < size; i++) {
            this.ctx.ellipse(i, i, x, y);
        }
    }

    thiccArc(x, y, cx, cy, startAngle, endAngle, size=1, step=1) {
        for (let i = 0; i < size; i++) {
            this.ctx.arc(x, y, cx-i*step, cy-i*step, startAngle, endAngle);
        }
    }

    save() {
        this.ctx.save();
    }
}
