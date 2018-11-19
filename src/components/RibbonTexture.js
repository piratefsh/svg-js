import Texture from "./Texture";

export default class CircleTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const { width, height } = this;
            const [x, y] = [this.translate.x, this.translate.y];
            console.log(width, height);
            console.log(this.translate);
            const curve = [
                this.translate.x + Math.random() * width,
                this.translate.y + Math.random() * height,
                this.translate.x + (Math.random() * width) / 2,
                this.translate.y + Math.random() * height,
                x,
                height
            ];
            for (let i = 0; i < width; i += 2) {
                const offsetX = i;
                this.ctx.cubicBezier(
                    [x + offsetX, y],
                    [
                        [
                            curve[0] + i,
                            curve[1] + i,
                            curve[2] + i,
                            curve[3] + i,
                            x + i,
                            this.translate.y + height
                        ]
                    ]
                );
            }
        });
    }
}
