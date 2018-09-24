export default class Drawing {
    constructor(options) {
        const optionsWithDefaults = Object.assign(
            {
                strokeWidth: 1
            },
            options
        );

        Object.assign(this, optionsWithDefaults);
        this.ctx = options.ctx;
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.path(`M ${x1} ${y1} L ${x1} ${y1} ${x2} ${y2}`).attr({
            fill: "none",
            stroke: "black",
            "stroke-width": this.strokeWidth
        });
    }
}
