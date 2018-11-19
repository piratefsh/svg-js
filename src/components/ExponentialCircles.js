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

            for (let i = 1; i < 13; i += 1) {
                const sizeX = Math.pow(2, i) *0.1;
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
