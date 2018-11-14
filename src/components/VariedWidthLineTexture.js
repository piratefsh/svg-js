import Texture from "./Texture";

export default class VariedWidthLineTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            for (let i = 0; i < this.numStrokes; i += 1) {
                this.ctx.setStyles({
                    strokeWidth: Math.floor(1 + Math.random() * 5)
                })
                const x =
                    Math.floor(Math.random() * this.width) + this.translate.x;
                const y1 =
                    (Math.random() > 0.5 ? 0 : this.height) + this.translate.y;
                const y2 =
                    Math.floor(Math.random() * this.height) + this.translate.y;

                this.ctx.line(x, y1, x, y2);
            }
        });
    }
}
