import { Noise } from 'noisejs';

export default class Drawing {
    constructor({ styles, ctx, width, height, seed }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsl(300, 80%, 50%)",
                strokeWidth: 1,
                fill: "hsla(100, 100%, 100%, 0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.lineStep = 4;
        this.numLines = this.height / this.lineStep;
        this.seed = seed;
    }

    jitter(max = 20) {
        return Math.random() * max;
    }

    draw() {
        const noise = new Noise(this.seed);
        const { ctx, width, height, numLines, lineStep } = this;
        const fn = (x, y, t) => {
            const shift = noise.simplex2(x / 150, y / 150);
            return {
                x: x + (Math.sin(x/width) * shift) * 50,
                y: y + Math.cos(shift) * 40,
            }
        }
        
        ctx.draw(() => {
            ctx.setStyles(this.styles);

            // ctx.rect(width, height, 0, 0);
            for (let i = 0; i <= numLines; i++) {
                const a = i * lineStep - width/2;
                const points = [];
                for (let j = 0; j <= numLines; j++) {
                    const b = j * lineStep - height/2;

                    const {x, y} = fn(a, b, a * width + b);
                    points.push({ x: x + width/2, y: y + height/2 });
                    // ctx.ellipse(2, 2, x, y)
                }
                ctx.polyline(points);
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
