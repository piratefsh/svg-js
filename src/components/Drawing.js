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
            const center = {x: this.width/2, y: this.height/2}
            const TWO_PI =  Math.PI*2
            const r = 100;
            for(let t = 0; t < TWO_PI ; t+= TWO_PI/5){
                const start = translate({x: r * Math.sin(t), y: r * Math.cos(t)}, center);
                // const start = center
                let pos = { x: start.x, y: start.y }
                ctx.startLine()
                let steps = 2000;
                // while(pos.x < this.width && pos.y < this.height){
                while(steps && pos.x < this.width && pos.y < this.height && pos.x > 0 && pos.y > 0){
                    const newPos = rotate(translate(pos, {x: randomSelect([4, -4]), y: 0}), randomSelect([0, Math.PI/2]), pos)
                    ctx.lineVertex(newPos.x, newPos.y);
                    // ctx.ellipse(5, 5, newPos.x, newPos.y);
                    pos = newPos;
                    steps--;
                }
                ctx.endLine()

            }


        });
    }

    save() {
        this.ctx.save();
    }
}
