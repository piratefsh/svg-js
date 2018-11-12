import Texture from "./Texture";

export default class ArcTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                const size = (i / this.numStrokes) * this.ctx.width;
                const startRadian =
                    Math.random() * Math.PI * (Math.random() > 0.5 ? -1 : 1);
                const endRadian = Math.random() * (Math.PI * 2) + startRadian;
                // (x, y, radX, radY, start, stop)
                this.ctx.arc(
                    Math.random() * this.ctx.width - size / 2,
                    Math.random() * this.ctx.height - size / 2,
                    size,
                    size,
                    startRadian,
                    endRadian
                );
            }
        });
    }
}
