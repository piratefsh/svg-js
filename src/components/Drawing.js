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
console.log(perm)
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
            const steps = 10;
            const branches = [];
            const depth = 6;
            const lineWidth = depth;
            const numLines = 20
            const step = width/numLines
            for(let i = 0; i < numLines; i++){
                this.thiccLine(i*step, height/numLines*i, i*step, height, numLines-i);
                this.thiccLine(step/2 + i*step, height/numLines*i + 1, step/2 + i*step, 0, i);
            }

        });
    }

    thiccLine(sx, sy, ex, ey, lineWidth=1){
        const vec = normalize(rotate({x: sx-ex, y: sy-ey}, Math.PI/2));
        for(let i = 0; i < lineWidth; i++){
            const st = translate({x: sx, y: sy}, mult(vec, i-Math.floor(lineWidth/2)))
            const en = translate({x: ex, y: ey}, mult(vec, i-Math.floor(lineWidth/2)))
            this.ctx.line(st.x, st.y, en.x, en.y);
        }
    }

    thiccDot(x, y, size){
        for(let i = 0; i < size; i++){
            this.ctx.ellipse(i, i, x, y)
        }
    }

    save() {
        this.ctx.save();
    }
}
