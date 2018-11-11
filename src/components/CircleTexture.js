export default class CircleTexture {
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
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < 1000; i += 1) {
                this.ctx.ellipse(
                    i,
                    i,
                    Math.random() * this.ctx.width,
                    Math.random() * this.ctx.height
                );
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
