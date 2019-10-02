export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0)"
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


            ctx.startLine();
            const angleStep = 0.01;
            const radius = 10;
            for(let theta = 0; theta < Math.PI*2; theta += angleStep){
                const x = radius * Math.sin(theta);
                const y = radius * Math.cos(theta);
                ctx.lineVertex(x, y)
            }
            ctx.endLine();
        });
    }

    save() {
        this.ctx.save();
    }
}
