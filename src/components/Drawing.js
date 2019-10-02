import { random, translate, rotate } from "../helpers/math";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    drawWalk(offset, angleStep, radius, steps) {
        const nextStep = (p, offset, n, steps) => {
            const x = (p.x - offset.x) * -((n / steps) * Math.PI) + offset.x;
            const y = (p.y - offset.y) * -((n / steps) * Math.PI) + offset.y;
            return { x, y };
        };
        const points = [];
        const { ctx } = this;

        for (
            let theta = 0;
            theta < Math.PI * 2;
            theta += random(0.05, angleStep)
        ) {
            const x = radius.x * Math.sin(theta);
            const y = radius.y * Math.cos(theta);
            points.push(translate(rotate({ x, y }, Math.PI / 4), offset));
        }
        points.push(points[0]);
        let currPoints = points.map(p => offset);

        for (let n = 1; n <= steps; n++) {
            const newPoints = [];
            // ctx.startLine();

            points.forEach((p, i) => {
                const { x, y } = nextStep(p, offset, n, steps);
                // ctx.lineVertex(x, y)

                const prev = currPoints[i + Math.floor(random(0, 2))];
                if (prev && random(0, 1) > 0.9) {
                    ctx.line(x, y, prev.x, prev.y);

                    const neib = nextStep(points[i + 1] || points[0], offset, n, steps);
                    ctx.line(x, y, neib.x, neib.y);
                }
                newPoints.push({ x, y });
            });

            currPoints = newPoints;

            // ctx.endLine();
        }
    }

    draw() {
        const { ctx } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            const offset = {
                x: this.width / 2,
                y: this.height / 2
            };
            const angleStep = 0.1;
            const radius = {
                x: 40,
                y: 40
            };
            const rings = 10;

            this.drawWalk(offset, angleStep, radius, rings);
        });
    }

    save() {
        this.ctx.save();
    }
}
