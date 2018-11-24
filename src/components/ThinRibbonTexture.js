import Texture from "./Texture";

export default class ThinRibbonTexture extends Texture {
    draw() {
        const { ctx } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            const { width, height, numStrokes } = this;
            const [x, y] = [this.translate.x, this.translate.y];
            const curves = [];
            const twists = 3;

            for (let i = 0; i < twists; i += 1) {
                const c = [];
                c.push(
                    ...[
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
                const currCurves = curves.map(c =>
                    c.map((n, i) => (i !== c.length - 1 ? n + off : n))
                );
                ctx.setStyles({ opacity: off / numStrokes });
                ctx.startBezier(x + offsetX, y);
                currCurves.forEach(c => {
                    this.ctx.bezierVertex(...c);
                });
                ctx.endBezier();
            }
        });
    }
}
