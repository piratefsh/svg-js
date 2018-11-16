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
            fixedScale,
            padding = {
                x: 10,
                y: 10
            }
        } = options;
        const cellWidth = (width + padding.x) / nrows;
        const cellHeight = (height + padding.y) / ncols;
        this.drawings = [];
        for (let c = 0; c < ncols; c += 1) {
            for (let r = 0; r < nrows; r += 1) {
                const numStrokes =
                    fixedScale || Math.pow(c * ncols + r + 1, scale);
                const texture = new TextureClass({
                    styles,
                    ctx,
                    width: cellWidth - padding.x,
                    height: cellHeight - padding.y,
                    numStrokes,
                    translate: {
                        x: r * cellWidth,
                        y: c * cellHeight
                    },
                    count: c * ncols + r,
                    totalCount: ncols * nrows
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
