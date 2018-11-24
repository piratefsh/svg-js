import Texture from "./Texture";

function pointOnCircle(rx, ry, rad) {
    const x = rx * Math.cos(rad) + rx;
    const y = ry * Math.sin(rad) + ry;
    return { x, y };
}
export default class ThinRibbonTexture extends Texture {
    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);
            const { width, height, numStrokes } = this;

            const curves = [];
            const twists = 10;
            const rx = width / 2;
            const ry = height / 2;

            for (let i = 0; i < twists; i += 1) {
                const s = pointOnCircle(rx, ry, (i / twists) * Math.PI * 2);
                const e = pointOnCircle(
                    rx,
                    ry,
                    ((i + 1) / twists) * Math.PI * 2
                );
                curves.push([
                    this.translate.x + Math.random() * s.x,
                    this.translate.y + Math.random() * s.y,
                    e.x,
                    e.y
                ]);
            }

            const start = pointOnCircle(rx, ry, 0);

            for (let off = 0; off < numStrokes; off += 3) {
                const currCurves = curves.map((c) =>
                    c.map((n, i) => (i !== c.length - 1 ? n + off : n))
                );
                this.ctx.setStyles({ opacity: 1 - off / numStrokes });
                this.ctx.startBezier(start.x, start.y);
                currCurves.forEach(c => {
                    this.ctx.bezierVertex(...c);
                });
                this.ctx.endBezier();
            }
        });
    }
}
