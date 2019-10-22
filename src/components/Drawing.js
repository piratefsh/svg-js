import { translate, midpoint, triangleCentroid } from "../helpers/math";

const PI = Math.PI;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(355, 90%, 70%, 0.7)",
            strokeWidth: 1,
            fill: "hsla(355, 90%, 10%, 0.0)",
            ...styles
        };

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            this.curveOfPursuit(6, 6*16, width/2, {
                x: width/2,
                y: height/2
            });

            // this.curveOfPursuit(4, 60, width/2, {
            //     x: width/2,
            //     y: height/2
            // }, -1, 'skyblue');
        });
    }

    // from Curve Stitching by Jon Milligan
    curveOfPursuit(
        sectors = 3,
        granularity = 60,
        size = this.width,
        center = { x: this.width / 2, y: this.height / 2 },
        dir = 1,
        color = 'deeppink'
    ) {
        const { ctx } = this;
        ctx.setStyles({stroke: color})
        ctx.ellipse(size, size, center.x, center.y);
        const l = (size * PI) / granularity;
        const dogStep = (2 * PI) / sectors;
        const hareStep = (2 * PI) / granularity;
        for (let b = -PI; b < PI; b += dogStep) {
            let dog = { x: 0, y: 0 };
            for (let t = (PI * 2) / sectors + b; t > b; t -= hareStep) {
                const hare = {
                    x: size/2 * Math.sin(t),
                    y: size/2 * Math.cos(t)
                };
                ctx.line(
                    center.x + dog.x,
                    center.y + dog.y,
                    center.x + hare.x,
                    center.y + hare.y
                );

                let h = Math.sqrt(
                    (hare.x - dog.x) * (hare.x - dog.x) +
                        (hare.y - dog.y) * (hare.y - dog.y)
                );
                dog.x += (l * (hare.x - dog.x)) / h;
                dog.y += (l * (hare.y - dog.y)) / h;
            }
        }
    }
    save() {
        this.ctx.save();
    }
}
