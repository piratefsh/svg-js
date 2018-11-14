export default class Texture {
    constructor({ styles, ctx, width, height, numStrokes, translate }) {
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

        this.numStrokes = numStrokes || 500;

        this.translate = translate;
    }

    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                this.ctx.ellipse(
                    (i / this.numStrokes) * this.width * 1.5,
                    (i / this.numStrokes) * this.height * 1.5,
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
