import Texture from "./Texture";

export default class ThinRibbonTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const { width, height, numStrokes } = this;
            const [x, y] = [this.translate.x, this.translate.y];
            const curves = [];
            const twists = 5;

            for (let i = 0; i < twists; i += 1) {
                const c = [];
                c.push(
                    ...[
                        this.translate.x + Math.random() * width,
                        this.translate.y + Math.random() * height,
                        this.translate.x + Math.random() * width,
                        this.translate.y + Math.random() * height,
                        x - numStrokes + (width / twists) * (i + 1),
                        y + (height / twists) * (i + 1)
                    ]
                );
                curves.push(c);
            }

            for (let off = 0; off < numStrokes; off += 3) {
                const offsetX = off;
                const currCurves = curves.map((c, i) =>
                    c.map((n, i) => (i !== c.length - 1 ? n + off : n))
                );
                this.ctx.setStyles({opacity: off/numStrokes})
                this.ctx.cubicBezier([x + offsetX, y], currCurves);
            }
        });
    }
}
