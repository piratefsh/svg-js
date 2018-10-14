import Drawing from "./Drawing";

export default class StrangeAttractor extends Drawing {
    constructor(options) {
        super(options);
        this.constants = options.constants;
        this.last = { x: 0.1, y: 0.1 };
        this.numPoints = options.numPoints || 10000;
    }

    xFn({ x, y }) {
        const { F1, A1, F2, A2 } = this.constants;
        return Math.sin(F1 * y + A1) - Math.cos(F2 * x + A2);
    }

    yFn({ x, y }) {
        const { F3, F4, A3, A4 } = this.constants;
        return Math.sin(F3 * x + A3) - Math.cos(F4 * y + A4);
    }

    draw() {
        const scale = this.width * 0.2;
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            for (let i = 0; i < this.numPoints; i += 1) {
                const x = this.xFn(this.last);
                const y = this.yFn(this.last);
                this.ctx.point(this.width / 2 + x * scale, this.width / 2 + y * scale);
                this.last = { x, y };
            }
        });
    }
}
