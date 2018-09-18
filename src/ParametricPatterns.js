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

        this.util = new Util(this.p5);

        this.reset();
    }

    genFillColors() {
        this.colorsUpdated = true;
        this.fillColors = [];
        for (let i = 0; i < this.numLines; i++) {
            const r = this.p5.map(
                i,
                0,
                this.numLines,
                this.color2[0],
                this.color[0]
            );
            const g = this.p5.map(
                i,
                0,
                this.numLines,
                this.color2[1],
                this.color[1]
            );
            const b = this.p5.map(
                i,
                0,
                this.numLines,
                this.color2[2],
                this.color[2]
            );
            const a = this.p5.map(i, 0, this.numLines, 0, 255);
            this.fillColors.push(this.p5.color(r, g, b, a));
        }
    }

    reset() {
        this.t = (Math.floor(this.p5.random(8)) * this.p5.PI) / 2;
        this.randVar = this.p5.random(0, this.seed);
        this.x1 = this.util.generateParametricEqn(
            this.width / this.p5.random(2, 5),
            6
        );
        this.y1 = this.util.generateParametricEqn(
            this.width / this.p5.random(2, 5),
            6
        );
        this.x2 = this.util.generateParametricEqn(
            this.width / this.p5.random(2, 5),
            6
        );
        this.y2 = this.util.generateParametricEqn(
            this.height / this.p5.random(2, 5),
            6
        );

        this.genFillColors();
    }

    draw() {
        this.genFillColors();
        const debug = false;
        // this.p5.push();
        // this.p5.strokeWeight(this.strokeWeight);

        // this.p5.translate(this.props.x + this.padding / 2, this.props.y + this.padding / 2);
        // this.p5.translate(this.width / 2, this.height / 2);
        const count = this.numLines * this.spacing;

        // this.p5.fill(0, 0, 0, 0);
        for (let i = 0; i < count; i += this.spacing) {
            const t = this.t + i;
            const color = this.fillColors[Math.floor(i / this.spacing)];
            this.p5.stroke(color);
            const points = [this.x1(t), this.y1(t), this.x2(t), this.y2(t)].map(
                pt => pt * this.amp
            );
            this.p5.line(...points);
            // console.log('calc', this.x2(t), this.y2(t));

            if (debug) {
                this.p5.ellipse(this.x1(t), this.y1(t), 10, 10);
                this.p5.ellipse(this.cx1(t), this.cy1(t), 5, 5);
                this.p5.ellipse(this.x2(t), this.y2(t), 10, 10);
                this.p5.ellipse(this.cx2(t), this.cy2(t), 5, 5);
            }
        }
        // this.p5.pop();
    }

    update() {
        this.t = this.t + this.speed;
    }

    cx1(t) {
        return (this.width / 2) * this.p5.cos(t);
    }

    cy1(t) {
        return (this.height / 2) * this.p5.sin(t);
    }

    cx2(t) {
        return (-this.width / 2) * this.p5.sin(t / 2);
    }

    cy2(t) {
        return (-this.height / 2) * this.p5.cos(t);
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
