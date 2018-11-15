export default class Texture {
    constructor(options) {

        Object.assign(this, options);

        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0,0,0,0)"
            },
            options.styles
        );
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
