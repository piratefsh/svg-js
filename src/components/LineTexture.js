import Texture from "./Texture";
import { vadd } from "../helpers/math";

export default class LineTexture extends Texture {
    drawFrame() {
        // start and end
        const { x: x1, y: y1 } = vadd({ x: 0, y: 0 }, this.translate);
        const { x: x2, y: y2 } = vadd({ x: 0, y: this.height }, this.translate);
        const { x: x3, y: y3 } = vadd({ x: this.width, y: 0 }, this.translate);
        const { x: x4, y: y4 } = vadd(
            { x: this.width, y: this.height },
            this.translate
        );
        this.ctx.line(x1, y1, x2, y2);
        this.ctx.line(x3, y3, x4, y4);
    }

    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            // debug
            // this.ctx.rect(
            //     this.width,
            //     this.height,
            //     this.translate.x,
            //     this.translate.y
            // );

            this.drawFrame();

            for (let i = 0; i < this.numStrokes; i += 1) {
                const x =
                    (Math.random() * this.width) + this.translate.x;
                const y1 =
                    (Math.random() > 0.5 ? 0 : this.height) + this.translate.y;
                const y2 =
                    (Math.random() * this.height) + this.translate.y;

                this.ctx.line(x, y1, x, y2);
            }
        });
    }
}
