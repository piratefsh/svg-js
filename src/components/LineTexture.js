import Texture from "./Texture";

export default class LineTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                const x = Math.floor(Math.random() * this.ctx.width);
                const y1 = Math.random() > 0.5 ? 0 : this.ctx.height;
                const y2 = Math.floor(Math.random() * this.ctx.height);

                this.ctx.line(x, y1, x, y2);
            }
        });
    }
}
