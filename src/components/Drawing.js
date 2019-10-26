import { TWO_PI, ellipseCoord, translate } from "../helpers/math";
export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = {
            stroke: "hsla(355, 90%, 70%, 0.7)",
            strokeWidth: 1,
            fill: "hsla(355, 90%, 10%, 0.0)",
            ...styles
        };

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        const { ctx, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles(this.styles);
            const numRings = 6;
            const granularity = 30;
            const size = { x: 40, y: 30 };
            const vel = {x: 0, y: -1}
            const rvel = {x: 0.2, y: 0.2}
            const center = { x: width / 2, y: height-50 };
            ctx.startLine();
            for (let j = 0; j < numRings; j++) {
                for (let i = 0; i < granularity; i++) {
                    console.log(i);
                    const theta = (i / granularity) * TWO_PI;
                    const pos = translate(
                        ellipseCoord(size.x, size.y, theta),
                        center
                    );
                    ctx.lineVertex(pos.x, pos.y);
                    center.x += vel.x;
                    center.y += vel.y;
                    size.x += rvel.x;
                    size.y += rvel.y;
                }
            }
            ctx.endLine();
        });
    }
    save() {
        this.ctx.save();
    }
}
