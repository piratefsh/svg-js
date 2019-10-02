import {random, translate, rotate} from '../helpers/math';
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

    drawRings(offset, angleStep, radius, rings){
        const points = []
        const { ctx } = this;

        for(let theta = 0; theta < Math.PI*2; theta += random(0.05, 0.2)){
            const x = radius.x * Math.sin(theta) * Math.cos(theta/5)
            const y = radius.y * Math.cos(theta)
            points.push(translate(rotate({x, y}, Math.PI/4), offset))
        }
        points.push(points[0])
        for(let n = 0; n < rings/2; n++){
            ctx.startLine();
            points.forEach((p) => {
                const x = (p.x - offset.x) * (4*Math.sin(n/rings * Math.PI)) + offset.x
                const y = (p.y - offset.y) * (4*Math.sin(n/rings * Math.PI)) + offset.y
                ctx.lineVertex(x, y)
            })
            ctx.endLine();
        }
    }

    draw() {
        const { ctx } = this;
        ctx.draw(() => {

            ctx.setStyles(this.styles);
            const offset = {
                x: this.width/2,
                y: this.height/2
            }
            const angleStep = 0.1;
            const radius = {
                x: 40,
                y: 35
            };
            const rings = 31;

            this.drawRings(offset, angleStep, radius, rings)
        });
    }

    save() {
        this.ctx.save();
    }
}
