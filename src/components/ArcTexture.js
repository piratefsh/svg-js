import Texture from "./Texture";

export default class ArcTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                const sizeX = (i / this.numStrokes) * this.ctx.width;
                const sizeY = (i / this.numStrokes) * this.ctx.height * Math.random()*1.6;
                const startRadian =
                    Math.random() * Math.PI * (Math.random() > 0.5 ? -1 : 1);
                const endRadian = Math.random() * (Math.PI * 2) + startRadian;
                // (x, y, radX, radY, start, stop)
                this.ctx.arc(
                    Math.random() * this.ctx.width - sizeX / 2,
                    Math.random() * this.ctx.height - sizeY / 2,
                    sizeX,
                    sizeY,
                    startRadian,
                    endRadian
                );
            }
        });
    }
}
