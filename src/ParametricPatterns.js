import Util from "./Utils";

export default class ParametricPatterns {
    constructor(props) {
        this.ctx = props.ctx;
        this.fillOpacity = 90;
        this.props = props;
        this.padding = 100;
        this.seed = props.seed;
        this.strokeWeight = 2;
        this.strokeOpacity = 1;
        this.width = props.width - this.padding;
        this.height = props.height - this.padding;
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
    }

    reset() {
        this.t = 0;
        this.randVar = Util.random(0, this.seed);
        this.x1 = Util.generateParametricEqn(this.width / Util.random(2, 5), 6);
        this.y1 = Util.generateParametricEqn(this.width / Util.random(2, 5), 6);
        this.x2 = Util.generateParametricEqn(this.width / Util.random(2, 5), 6);
        this.y2 = Util.generateParametricEqn(
            this.height / Util.random(2, 5),
            6
        );
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.path(`M ${x1} ${y1} L ${x1} ${y1} ${x2} ${y2}`).attr({
            fill: "none",
            stroke: "black"
        });
    }

    draw() {
        const count = this.numLines * this.spacing;

        for (let i = 0; i < count; i += this.spacing) {
            const t = this.t + i;

            const points = [this.x1(t), this.y1(t), this.x2(t), this.y2(t)].map(
                pt => pt * this.amp
            );
            this.drawLine(...points);
        }
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
