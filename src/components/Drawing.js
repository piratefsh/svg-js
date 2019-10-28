import { rotate } from "../helpers/math";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "black",
            strokeWidth: 1,
            fill: "rgba(0, 0, 0, 0)",
            ...styles
        };

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

    }

    draw() {
        const { ctx, width, height, styles } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            ctx.setStyles(styles);
            this.sqFractal(width / 2, height / 2, width - width / 2, 3);
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

    sqFractal(x, y, size, rounds = 4, rot = 0, depth = 0, tube = false) {
        const { ctx } = this;

        if (depth === rounds) {
            return;
        }

        // draw sq for each corner
        const s = size / 2;

        for (let i = 0; i < 4; i += 1) {
            const theta = rot + (Math.PI / 2) * (i + 1);
            let line;
            if ((i === 3 && depth > 0) || (i === 1 && tube)) {
                line = Drawing.sqCornerPointsCorner(x, y, size / 2);
            } else {
                line = Drawing.sqCornerPoints(x, y, size / 2);
            }

            line.forEach((pos, i) => {
                if (pos.move) return;
                const p = rotate(pos, theta, { x, y });
                const prev = line[i - 1];
                if (prev) {
                    const pr = rotate(prev, theta, { x, y });
                    ctx.thickLine(pr.x, pr.y, p.x, p.y, rounds - depth);
                }
            });
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
                rounds,
                rot + (Math.PI / 2) * (i + 3),
                depth + 1,
                (i === 3 || (i === 1 && tube)) && depth > 0
            );
        });
    }

    save() {
        this.ctx.save();
    }
}
