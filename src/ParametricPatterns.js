import Util from "./Utils";

export default class ParametricPatterns {
    constructor(props) {
        this.ctx = props.ctx;
        this.fillOpacity = 90;
        this.props = props;
        this.padding = props.padding || 30;
        this.seed = props.seed;
        this.strokeWeight = props.strokeWeight || 2;
        this.strokeOpacity = 1;
        this.width = props.width - this.padding * 2;
        this.height = props.height - this.padding * 2;
        this.speed = props.speed || 0.02;
        this.t = 0;
        this.numLines = props.numLines || 80;
        this.color = props.color || [100, 100, 100];
        this.color2 = props.color2 || props.color;
        this.randVar = Math.random * this.seed;
        this.spacing = props.spacing || 0.08;
        this.amp = props.amp || 1;
        this.dir = Math.pow(-1, props.amp * 10);
        this.colorsUpdated = false;
        this.fillColors = [];

        this.reset();

        this.position = { x: 0, y: 0 };
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    setPosition({ x, y }) {
        this.position = { x, y };
    }

    reset() {
        this.t = Util.random(Math.PI * 2);
        this.randVar = Util.random(0, this.seed);
        const xRatio = Util.random(4, 8);
        const yRatio =  Util.random(4, 8);
        this.x1 = Util.generateParametricEqn(this.width / xRatio, 4);
        this.y1 = Util.generateParametricEqn(this.height / 4 - xRatio, 3);
        this.x2 = Util.generateParametricEqn(this.width / yRatio, 3);
        this.y2 = Util.generateParametricEqn(this.height / 4 - yRatio, 3);
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.path(`M ${x1} ${y1} L ${x1} ${y1} ${x2} ${y2}`).attr({
            fill: "none",
            stroke: "black",
            "stroke-width": this.strokeWeight
        });
    }

    drawCurve(x1, y1, x2, y2, cx1, cy1) {
        this.ctx
            .path(`M ${x1} ${y1} C ${x1} ${y1} ${cx1} ${cy1} ${x2} ${y2}`)
            .attr({
                fill: "none",
                stroke: "black",
                "stroke-width": this.strokeWeight
            });
    }

    setPhase(phase) {
        this.t = phase;
    }

    draw() {
        const count = this.numLines * this.spacing;

        for (let i = 0; i < count; i += this.spacing) {
            const t = this.t + i;

            const points = [
                this.x1.fn(t),
                this.y1.fn(t),
                this.x2.fn(t + Math.PI),
                this.y2.fn(t + Math.PI),
                this.cx1(t),
                this.cy1(t)
            ].map(pt => pt * this.amp);
            this.drawCurve(...this.shiftPoints(points));
        }
    }

    equations() {
        return [this.x1.string, this.y1.string, this.x2.string, this.y2.string];
    }

    shiftPoints(arr) {
        return arr.map(
            (p, i) =>
                i % 2 == 0
                    ? p + this.width / 2 + this.padding + this.position.x
                    : p + this.height / 2 + this.padding + this.position.y
        );
    }

    update() {
        this.t = this.t + this.speed;
    }

    cx1(t) {
        return (this.width / 2) * Math.cos(t);
    }

    cy1(t) {
        return (this.height / 2) * Math.sin(t);
    }

    cx2(t) {
        return (-this.width / 2) * Math.sin(t / 2);
    }

    cy2(t) {
        return (-this.height / 2) * Math.cos(t);
    }
}

ParametricPatterns.X1_FREQ = 50;
ParametricPatterns.Y1_FREQ = 7;
ParametricPatterns.X2_FREQ = 90;
ParametricPatterns.Y2_FREQ = 5;
ParametricPatterns.X1_AMP = 20;
ParametricPatterns.Y1_AMP = 100;
ParametricPatterns.X2_AMP = 7;
ParametricPatterns.Y2_AMP = 300;
