export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "black",
            strokeWidth: 1,
            fill: "rgba(0, 0, 0, 0.1)",
            ...styles
        };

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx } = this;
        ctx.draw(() => {
            ctx.setStyles({ fill: "#eee" });
            ctx.rect(this.width, this.height, 0, 0);

            ctx.setStyles(this.styles);

            ctx.startBezier(30, 70);
            ctx.bezierVertex(50, 50, 134, 122, 160, 170);
            ctx.bezierVertex(190, 120, 210, 210);
            ctx.endBezier();

            ctx.startLine();
            ctx.lineVertex(200, 0);
            ctx.lineVertex(100, 50);
            ctx.lineVertex(250, 100);
            ctx.lineVertex(100, 200);
            ctx.lineVertex(400, 400);
            ctx.endLine();

            ctx.setStyles({ fill: "rgba(0,0,0,0)" });
            ctx.thickLine(30, 100, 50, 200, 4);
            ctx.thickDot(60, 220, 20);
        });
    }

    save() {
        this.ctx.save();
    }
}
