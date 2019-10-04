import { random, randomSelect, translate, rotate, dist } from "../helpers/math";

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
        ctx.setStyles(styles);
        ctx.draw(() => {
            const grid = { x: 3, y: 3 };
            const center = { x: this.width / 2, y: this.height / 2 };
            const cell = { x: this.width / grid.x, y: this.height / grid.y };
            let baits = [center];
            let bugs = [];
            const numBaits = 60;

            for (let i = 0; i < numBaits; i++) {
                baits.push({
                    x: Math.floor(random(0, this.width)),
                    y: Math.floor(random(0, this.height))
                });
            }
            // draw baits
            baits.forEach(bt => {
                ctx.ellipse(10, 10, bt.x, bt.y);
            });


            for (let i = 0; i <= grid.x; i++) {
                const offsetY = i % 2 == 0 ? 0 : cell.y / 2;
                for (let j = 0; j <= grid.y; j++) {
                    const bug = { x: i * cell.x, y: 0 + j * cell.y };
                    bugs.push(bug);
                    ctx.ellipse(10, 10, bug.x, bug.y);
                }
            }

            const uncaught = bugs.length;
            let maxSteps = 50;

            let temp = bugs;
            bugs = baits
            baits = temp

            while (maxSteps) {
                maxSteps--;

                baits.forEach((bt) => {
                    // bt.x += Math.sin(0.8)*5;
                    // bt.y += Math.cos(0.8)*5;
                })
                bugs.forEach((b, i) => {
                    // find nearest bait
                    const bait = baits.reduce((nearest, bt) => {
                        if (!nearest || dist(b, bt) < dist(b, nearest)) {
                            return bt;
                        }
                        return nearest;
                    }, null);

                    ctx.startLine();
                    if (
                        maxSteps &&
                        (Math.abs(b.x - bait.x) > 3 ||
                            Math.abs(b.y - bait.y) > 3)
                    ) {
                        // console.log(i, b, bait)
                        ctx.ellipse(3, 3, b.x, b.y);
                        // ctx.lineVertex(b.x, b.y);
                        b.x += (bait.x - b.x) / 4;
                        b.y += (bait.y - b.y) / 4;

                    }

                    ctx.lineVertex(bait.x, bait.y);
                    ctx.endLine();
                });
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
