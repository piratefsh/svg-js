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
            scale = 50,
            padding = {
                x: width * 0.02,
                y: height * 0.02
            }
        } = options;
        const cellWidth = width / ncols;
        const cellHeight = height / nrows;
        this.drawings = [];
        for (let r = 0; r < nrows; r += 1) {
            for (let c = 0; c < ncols; c += 1) {
                const texture = new TextureClass({
                    styles,
                    ctx,
                    width: cellWidth - padding.x * 2,
                    height: cellHeight - padding.y * 2,
                    numStrokes: (r * nrows + c + 1) * scale,
                    translate: {
                        x: r * cellHeight + padding.x,
                        y: c * cellWidth + padding.y
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
}
