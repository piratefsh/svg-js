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

    draw() {
        const { ctx } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            ctx.startBezier(30, 70);
            ctx.bezierVertex(25, 25, 100, 50, 50, 100);
            ctx.bezierVertex(75, 140, 120, 120);
            ctx.endBezier();
        });
    }

    save() {
        this.ctx.save();
    }
}
