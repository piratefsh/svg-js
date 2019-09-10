import { rotate, translate } from "../helpers/math";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.1)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.fillStyle = {
            fill: "hsla(200, 50%, 10%, 1)",
            strokeWidth: 0
        };
    }

    draw() {
        const { ctx, width, height, styles } = this;
        ctx.draw(() => {
            // ctx.setStyles({ fill: "#eee" });
            ctx.setStyles(this.fillStyle);
            ctx.rect(width, height, 0, 0);
            ctx.setStyles(styles);
            this.sqFractal(width / 2, height / 2, width - width / 2);
        });
    }

    static sqCornerPoints(ix, iy, size) {
        const s = size;
        const x = ix - size;
        const y = iy + size;
        const hyp = Math.sqrt((size / 2) ** 2 + (s / 4) ** 2);
        return [
            {
                x,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s - s / 2
            },
            {
                x: x - s / 2 + s + s / 2,
                y: y - s / 2 + s - s / 2 - hyp
            },
            {
                x: x - s / 2 + s + s,
                y: y - s / 2 + s - s / 2
            }
        ];
    }

    static sqCornerPointsCorner(ix, iy, size) {
        const s = size;
        const x = ix - size;
        const y = iy + size;
        const hyp = Math.sqrt((size / 2) ** 2 + (s / 4) ** 2);
        return [
            {
                x,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2
            },
            {
                x: x - s / 2,
                y: y - s / 2 + s / 2
            },
            {
                x: x - s / 2 - s / 2,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2,
                y: y + s / 2 + s / 2,
                move: true
            },
            {
                x: x - s / 2 + s / 2,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s
            },
            {
                x: x - s / 2 + s,
                y: y - s / 2 + s - s / 2
            },
            {
                x: x - s / 2 + s + s / 2,
                y: y - s / 2 + s - s / 2 - hyp
            },
            {
                x: x - s / 2 + s + s,
                y: y - s / 2 + s - s / 2
            }
        ];
    }

    sqFractal(x, y, size, rot = 0, depth = 0, tube = false, rounds = 5) {
        const { ctx } = this;

        // ctx.setStyles(this.fillStyle);
        // ctx.crect(size, size, x, y);
        // ctx.setStyles(this.styles);

        if (depth === rounds) {
            return;
        }

        // draw sq for each corner
        const s = size / 2;
        ctx.setStyles({ strokeWidth: rounds - depth });

        for (let i = 0; i < 4; i += 1) {
            const theta = rot + (Math.PI / 2) * (i + 1);
            let line;
            if ((i === 3 && depth > 0) || (i === 1 && tube)) {
                line = Drawing.sqCornerPointsCorner(x, y, size / 2);
            } else {
                line = Drawing.sqCornerPoints(x, y, size / 2);
            }

            ctx.startLine();
            line.forEach(pos => {
                const p = rotate(pos, theta, { x, y });
                if (pos.move) {
                    ctx.lineMove(p.x, p.y);
                } else {
                    ctx.lineVertex(p.x, p.y);
                }
            });
            ctx.endLine();
        }

        const shift = size / 2;

        [
            { x: x - shift, y: y - shift },
            { x: x + shift, y: y - shift },
            { x: x + shift, y: y + shift },
            { x: x - shift, y: y + shift }
        ].forEach((pos, i) => {
            const { x: sx, y: sy } = rotate(pos, rot, { x, y });
            this.sqFractal(
                sx,
                sy,
                s,
                rot + (Math.PI / 2) * (i + 3),
                depth + 1,
                (i === 3 || (i === 1 && tube)) && depth > 0,
                rounds
            );
        });
    }

    save() {
        this.ctx.save();
    }
}
