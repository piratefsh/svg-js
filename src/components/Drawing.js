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
            const depth = 8;
            const lineWidth = depth/2;
            this.branch({ x: width/2, y: height }, { y: -100, x: 0 }, lineWidth, depth);
        });
    }

    thiccLine(start, end, lineWidth){
        for(let i = 0; i < lineWidth; i++){
            this.ctx.line(start.x + i, start.y + i, end.x + i, end.y + i);
        }
    }

    branch(pos, velocity, width, maxSteps) {
        const { ctx } = this;
        const { x, y } = pos;
        if (
            maxSteps <= 0 ||
            x < 0 ||
            y < 0
        ) {
            return;
        }

        let lineWidth = width > 1 ? width : 1;

        this.thiccLine(pos, translate(pos, velocity), lineWidth);
        this.branch(
            translate(pos, mult(velocity, 0.5)),
            rotate(mult(velocity, 0.6), -1 * Math.PI * random(0.08, 0.12)),
            lineWidth - 1,
            maxSteps - 1
        );

        this.branch(
            translate(pos, mult(velocity, 0.5)),
            rotate(mult(velocity, 0.7), Math.PI*0.2),
            lineWidth - 1,
            maxSteps - 1
        );
        this.branch(
            translate(pos, mult(velocity, 1)),
            rotate(mult(velocity, 0.7), Math.PI*0.02),
            lineWidth - 1,
            maxSteps - 1
        );
    }

    save() {
        this.ctx.save();
    }
}
