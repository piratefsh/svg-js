import Drawing from "./Drawing";

// Curve Stitching by Jon Millington

export default class CurveStitch extends Drawing {
    constructor(options) {
        super(options);
        this.ratio = 2;
        this.radius = this.width / 2;
        this.numLines = 18;
        this.radiusRatio = 0.75;
    }

    // pg 65
    draw20ConcentricCircles() {
        const step = Math.PI / (this.numLines * this.ratio);
        for (let b = 0; b < Math.PI * 2; b += step) {
            const x1 = this.width / 2 + this.radius * Math.sin(b);
            const y1 = this.height / 2 + this.radius * Math.cos(b);

            const h = this.ratio * b;
            const x2 =
                this.width / 2 + this.radiusRatio * this.radius * Math.sin(h);
            const y2 =
                this.height / 2 - this.radiusRatio * this.radius * Math.cos(h);
            this.drawLine(x1, y1, x2, y2);
        }
    }
}
