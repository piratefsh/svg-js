import { random, randomSelect, translate, rotate } from "../helpers/math";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 2,
                fill: "rgba(0, 0, 0, 0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }


    draw() {
        const { ctx, styles } = this;
        ctx.setStyles(styles)
        ctx.draw(() => {

            const start = {x: 0, y: 0};
            let pos = { x: start.x, y: start.y }
            ctx.startLine()
            while(pos.x < this.width && pos.y < this.height){
                const newPos = rotate(translate(pos, {x: randomSelect([10, -10]), y: 0}), randomSelect([0, Math.PI/2]), pos)
                ctx.lineVertex(newPos.x, newPos.y);
                // ctx.ellipse(5, 5, newPos.x, newPos.y);
                pos = newPos;
            }
            ctx.endLine()


        });
    }

    save() {
        this.ctx.save();
    }
}
