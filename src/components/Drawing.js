export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                strokeWidth: 1,
                fill: "none",
                stroke: "black"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    drawEllipse(
        sizeX = 100,
        sizeY = 100,
        x = this.width / 2,
        y = this.height / 2
    ) {
        this.ctx
            .ellipse(sizeX, sizeY)
            .cx(x)
            .cy(y)
            .attr(this.styles);
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx
            .path(`M ${x1} ${y1} L ${x1} ${y1} ${x2} ${y2}`)
            .attr(this.styles);
    }

    draw() {
        this.drawEllipse();
    }

    getMetadata() {
        return this.getName();
    }

    getName(){
        return this.constructor.name;
    }
}
