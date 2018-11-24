import Texture from "./Texture";

export default class ArcsofArcs extends Texture {
    draw() {
        const { numStrokes } = this;
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const pos = {
                x: this.width / 2 + this.translate.x,
                y: this.height / 2 + this.translate.y
            };

            for (let i = 1; i < numStrokes; i += 1) {
                const sizeX = ((i / numStrokes) * this.width) / 2;
                const sizeY = sizeX;
                const startRadian = Math.PI;
                const endRadian = Math.PI * 2;
                this.ctx.arc(
                    pos.x,
                    pos.y,
                    sizeX,
                    sizeY,
                    startRadian,
                    endRadian
                );
            }
        });
    }
}
