export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0,0,0,0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    ellipse(sizeX = 100, sizeY = 100, x = this.width / 2, y = this.height / 2) {
        this.ctx.ellipse(sizeX, sizeY, x, y);
    }

    line(x1, y1, x2, y2) {
        this.ctx.line(x1, y1, x2, y2);
    }

    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for(let i = 0; i < 10; i++){
                this.ctx.ellipse(100, 100, Math.random() * 150, Math.random() * 150);
            }
        });
    }

    getMetadata() {
        return this.getName();
    }

    getName() {
        return this.constructor.name;
    }
}
