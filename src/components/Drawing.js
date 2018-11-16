export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "black",
                strokeWidth: 1,
                fill: "rgba(0,0,0,0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.draw(() => {
            this.ctx.setStyles(this.styles);

            this.ctx.cubicBezier(
                [30, 70],
                [[25, 25, 100, 50, 50, 100], [50, 140, 75, 140, 120, 120]]
            );
            for (let i = 0; i < 10; i += 1) {
                // this.ctx.arc(
                //     this.width/2, this.height/2,
                //     100, 100,
                //     Math.PI, Math.PI*2
                // );
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
