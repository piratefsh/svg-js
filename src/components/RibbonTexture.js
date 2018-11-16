import Texture from "./Texture";

export default class CircleTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const [x, y] = [this.translate.x, this.translate.y];
            const { width, height } = this;
            console.log(width, height)
            console.log(this.translate)
            const curve = [
                this.translate.x + Math.random() * width,
                this.translate.y + Math.random() * height,
                this.translate.x + Math.random() * width,
                this.translate.y + Math.random() * height,
                this.translate.x + Math.random() * width,
                this.translate.y + Math.random() * height
            ];
            for (let i = 0; i < width; i += 10) {
                const offsetX = i;
                this.ctx.cubicBezier([x + offsetX, y], [curve.map(c => c + i)]);
            }
        });
    }
}
