import Texture from "./Texture";

export default class CircleTexture extends Texture {
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
}
