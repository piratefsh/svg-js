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
    }

    draw() {
        const { ctx, width, height, styles } = this;
        ctx.draw(() => {
            // ctx.setStyles({ fill: "#eee" });
            ctx.setStyles(styles);
            // ctx.rect(width, height, 0, 0);
            this.sqFractal(width / 2, height / 2, width - width / 2);
        });
    }

    static sqCornerPoints(ix, iy, size) {
        const s = size;
        const x = ix - size;
        const y = iy + size;
        const hyp = Math.sqrt(Math.pow(size / 2, 2) + Math.pow(s / 4, 2));
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
        const hyp = Math.sqrt(Math.pow(size / 2, 2) + Math.pow(s / 4, 2));
        return [
            [
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
                    x: x - s / 2 - s/2,
                    y: y - s / 2 + s
                }
            ],
            [
                {
                    x: x - s/2,
                    y: y + s/2 + s/2,
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
            ]
        ];
    }

    trRot(pos, center, rot) {
        return translate(
            rotate(
                translate(pos, {
                    x: -center.x,
                    y: -center.y
                }),
                rot
            ),
            center
        );
    }

    sqFractal(x, y, size, rot = 0, depth=0) {
        const { ctx } = this;

        // ctx.crect(size, size, x, y);

        if (size < 20) {
            return;
        }
        // draw sq for each corner
        const s = size / 2;
        ctx.setStyles({ stroke: "blue", strokeWidth: 5-depth, fill: "none" });

        for (let i = 1; i <= 4; i += 1) {
            // const t = rot + (Math.PI / 2) * i;
            if (i === 4 && depth != 0) {
                const theta = rot + (Math.PI / 2) * i;
                const sets = Drawing.sqCornerPointsCorner(x, y, size / 2)

                sets.forEach((s) => {
                    ctx.startLine();
                        s.map(pos => this.trRot(pos, { x, y }, theta))
                        .forEach(p => ctx.lineVertex(p.x, p.y));
                    ctx.endLine();
                })
            } else {
                ctx.startLine();
                const theta = rot + (Math.PI / 2) * i;
                Drawing.sqCornerPoints(x, y, size / 2)
                    .map(pos => this.trRot(pos, { x, y }, theta))
                    .forEach(p => ctx.lineVertex(p.x, p.y));
                ctx.endLine();
            }
        }
        // ctx.setStyles({ stroke: "green", strokeWidth: 3, fill: "none" });
        // const { x: ex, y: ey } = translate(rotate(translate({ x, y: y + s }, {x: -x, y: -y}), rot), {x, y});
        // ctx.line(x, y, ex, ey);

        ctx.setStyles(this.styles);
        const shift = size / 2;
        this.sqFractal(x + shift, y - shift, s, (Math.PI / 2) * 0, depth + 1);
        this.sqFractal(x + shift, y + shift, s, (Math.PI / 2) * 1, depth + 1);
        this.sqFractal(x - shift, y + shift, s, (Math.PI / 2) * 2, depth + 1);
        this.sqFractal(x - shift, y - shift, s, (Math.PI / 2) * 3, depth + 1);
    }

    save() {
        this.ctx.save();
    }
}
