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
            const gx = width;
            const gy = height;
            const nr = 7;
            const nc = nr;
            const amp = random(0, 2);
            const margin = { x: 50, y: 50 };

            ctx.setStyles({
                fill: "hsl(10, 10%, 90%) ",
                stroke: "none"
            });

            ctx.setStyles(styles);
            grid2d(gx, gy, nr, nc, (x, y, cx, cy, i, j) => {
                const pos = { x, y };
                // ctx.rect(cx, cy, pos.x, pos.y);
                const prob = random(0, 1);
                if (i % 3 == 1) {
                    if (prob < (i == nr ? 0.3 : 0.8)) {
                        ctx.arc(x, y, cx, cy, Math.PI, 0);

                        if (prob < 0.7) {
                            const len = 1.2;
                            const offset = random(
                                -Math.PI / 2 + 0.3,
                                Math.PI / 2 - 0.5
                            );
                            const segment = {
                                start: Math.PI + len + offset,
                                end: -len + offset
                            };
                            for (let i = 0; i < 6; i++) {
                                ctx.arc(
                                    x,
                                    y,
                                    cx - 1 * i,
                                    cy - 1 * i,
                                    segment.start,
                                    segment.end
                                );
                            }
                        }
                    }
                } else {
                    let angles = { start: 0, end: Math.PI }
                    let anglesInner = { start: 0.4, end: Math.PI - 0.4 }
                    if (prob < (i == nr || i == 0 ? 0.3 : 0.8)) {
                        if(i == 0){
                            angles = { start: 0, end: Math.PI/2 }
                        }
                        if(i == nc){
                            angles = { start: Math.PI, end: Math.PI/2 }
                        }
                        ctx.arc(x, y, cx, cy, angles.start, angles.end);
                        ctx.arc(x, y, cx - 1, cy - 1, angles.start, angles.end);
                        if(prob < 0.2){
                            ctx.arc(x, y, cx - 2, cy - 2, angles.start, angles.end);
                        }
                    }
                    // rings
                    if (prob < 0.4) {
                        if(i == 0){
                            anglesInner = { start: 0.4, end: Math.PI/2 }
                        }
                        for (let j = 0; j < 5; j++) {
                            ctx.arc(
                                x,
                                y,
                                cx - 4 * j,
                                cy - 4 * j,
                                anglesInner.start,
                                anglesInner.end
                            );
                        }
                    }
                }
            });
        });
    }

    save() {
        this.ctx.save();
    }
}
