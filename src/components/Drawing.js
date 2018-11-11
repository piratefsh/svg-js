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
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < 10; i += 1) {
                this.ctx.rect(
                    i * 50 + 5,
                    i * 50 + 5,
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
