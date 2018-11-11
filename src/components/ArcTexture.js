import Texture from "./Texture";

export default class CircleTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                const size = (i / this.numStrokes) * this.width * 1.5
                this.ctx.triangle(
                    size,
                    size,
                    Math.random() * this.ctx.width - size/2,
                    Math.random() * this.ctx.height - size/2
                );
            }
        });
    }
}
