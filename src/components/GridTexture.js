export default class GridTexture {
    constructor(options) {
        Object.assign(this, options);

        const {
            nrows,
            ncols,
            width,
            height,
            ctx,
            TextureClass,
            styles,
            scale = 2,
            padding = {
                x: width * 0.05,
                y: height * 0.05
            }
        } = options;
        const cellWidth = (width + padding.x) / nrows;
        const cellHeight = (height + padding.y) / ncols;
        this.drawings = [];
        for (let c = 0; c < ncols; c += 1) {
            for (let r = 0; r < nrows; r += 1) {
                const numStrokes = Math.pow(c * ncols + r + 1, scale);
                console.log(numStrokes);
                const texture = new TextureClass({
                    styles,
                    ctx,
                    width: cellWidth - padding.x,
                    height: cellHeight - padding.y,
                    numStrokes,
                    translate: {
                        x: r * cellWidth,
                        y: c * cellHeight
                    }
                });

                this.drawings.push(texture);
            }
        }
    }

    draw() {
        this.drawings.forEach(texture => {
            texture.draw();
        });
    }

    save() {
        this.ctx.save();
    }
}
