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

    kernel(x, y, rx, ry, cx, cy) {
        const { ctx } = this;
        // ctx.ellipse(2, 2, x, y)
        ctx.arc(x, y, rx, ry, 0 + Math.PI / 2, Math.PI + Math.PI / 2);
        ctx.arc(x + cx / 2, y, rx, ry, Math.PI + Math.PI / 2, 0 + Math.PI / 2);
        ctx.line(x, y - ry, x + cx / 2, y - ry);
        ctx.line(x, y + ry, x + cx / 2, y + ry);
    }

    draw() {
        const { ctx, styles, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(styles);
            const steps = 10;
            const branches = [];
            const depth = 6;
            const lineWidth = depth;
            this.branch({ y: 0, x: height/2 - 30}, { y: 150, x: 0 }, lineWidth, depth);
            this.branch({ y: width, x: height/2 + 30}, { y: -150, x: 0 }, lineWidth, depth);
        });
    }

    thiccLine(start, end, lineWidth){
        for(let i = -lineWidth/2; i < lineWidth/2; i++){
            this.ctx.line(start.x + i, start.y + i, end.x + i, end.y + i);
        }
    }

    thiccDot(pos, size){
        for(let i = 0; i < size; i++){
            this.ctx.ellipse(i, i, pos.x, pos.y)
        }
    }

    branch(pos, velocity, width, maxSteps) {
        const size = 4;
        const { ctx } = this;
        const { x, y } = pos;
        if (
            maxSteps <= 0 ||
            x < 0 ||
            y < 0
        ) {
            // ctx.ellipse(2, 2, x, y)
            if(random(0, 1) > 0){
                // this.thiccDot({x, y}, 6)
                // ctx.ellipse(size, size, x, y-size)
                // ctx.ellipse(size, size, x-size, y)
                // ctx.ellipse(size, size, x+size, y)
                // ctx.ellipse(size, size, x, y-size)
                // ctx.ellipse(size, size, x, y+size)
            }
            return;
        }

        let lineWidth = width > 1 ? width : 1;

        // this.thiccDot({x, y}, 2)

        this.thiccLine(pos, translate(pos, velocity), lineWidth);
        this.branch(
            translate(pos, mult(velocity, 0.45)),
            rotate(mult(velocity, 0.5), -1 * Math.PI * 0.3),
            lineWidth - 1,
            maxSteps - 1
        );

        this.branch(
            translate(pos, mult(velocity, 0.5)),
            rotate(mult(velocity, -0.66), Math.PI * perm),
            lineWidth - 1,
            maxSteps - 1
        );
        this.branch(
            translate(pos, mult(velocity, 1)),
            rotate(mult(velocity, 0.5), Math.PI*0.25),
            lineWidth - 1,
            maxSteps - 1
        );

        // this.branch(
        //     translate(pos, mult(velocity, 1)),
        //     rotate(mult(velocity, 0.3), Math.PI*1),
        //     lineWidth - 1,
        //     maxSteps - 1
        // );
    }

    save() {
        this.ctx.save();
    }
}
