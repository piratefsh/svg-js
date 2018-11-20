import Texture from "./Texture";

export default class CircleofCircles extends Texture {
    draw() {
        const { numStrokes } = this;
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const pos = {
                x: this.width / 2 + this.translate.x,
                y: this.height / 2 + this.translate.y
            };

            for (let i = 0; i < numStrokes; i += 1) {
                const sizeX = i/numStrokes * this.width;
                const sizeY = sizeX;
                this.ctx.ellipse(
                    sizeX,
                    sizeY,
                    pos.x,
                    pos.y
                );
            }
        });
    }
}
