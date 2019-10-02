import { random, randomSelect, translate, rotate } from "../helpers/math";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
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
            const start = {x: this.width/2, y: this.height/2};
            let pos = { x: start.x, y: start.y }
            let stepsLeft = 30;
            ctx.startLine()
            while(stepsLeft > 0){
                const newPos = rotate(translate(pos, {x: random(5, 20), y: 0}), randomSelect([0, Math.PI/2, Math.PI, Math.PI * 0.75]), pos)
                ctx.lineVertex(newPos.x, newPos.y);
                ctx.ellipse(5, 5, newPos.x, newPos.y);
                console.log(stepsLeft, newPos.x, newPos.y);
                stepsLeft--;
                pos = newPos;
            }
            ctx.endLine()
        });
    }

    save() {
        this.ctx.save();
    }
}
