import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    normalize
} from "../helpers/math";

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
            const grid = { x: 4, y: 4 };
            const center = { x: this.width / 2, y: this.height / 2 };
            const cell = { x: this.width / grid.x, y: this.height / grid.y };
            const bugs = [];
            const baits = [];
            const numbugs = 18;

            for (let i = 0; i < numbugs; i++) {
                const theta = (i / numbugs) * Math.PI * 2;
                bugs.push({
                    x: center.x + 200 * Math.sin(theta),
                    y: center.y + 200 * Math.cos(theta)
                });
            }
            // draw bugs
            bugs.forEach(bt => {
                // ctx.ellipse(20, 20, bt.x, bt.y);
            });

            for (let i = 0; i <= grid.x; i++) {
                const offsetY = i % 2 == 0 ? 0 : cell.y / 2;
                for (let j = 0; j <= grid.y; j++) {
                    const bait = {
                        x: i * cell.x,
                        y: 0 + j * cell.y
                    };

                    const vel = normalize({
                        x: center.x - bait.x,
                        y: center.y - bait.y
                    });

                    bait.velocity = {
                        x: vel.x * 2,
                        y: vel.y * 2
                    };

                    if (dist(bait, center) < 200)
                     {
                        baits.push(bait);
                        // ctx.ellipse(10, 10, bait.x, bait.y);
                    }
                }
            }

            const uncaught = baits.length;
            let maxSteps = 70;

            while (maxSteps) {
                maxSteps--;

                baits.forEach(bt => {
                    bt.x += bt.velocity.x;
                    bt.y += bt.velocity.y;
                });

                ctx.startLine();
                bugs.forEach((b, i) => {
                    // find nearest bait
                    const bait = baits.reduce((nearest, bt) => {
                        if (!nearest || dist(b, bt) < dist(b, nearest)) {
                            return bt;
                        }
                        return nearest;
                    }, null);

                    if (
                        maxSteps &&
                        (Math.abs(b.x - bait.x) > 3 ||
                            Math.abs(b.y - bait.y) > 3)
                    ) {
                        b.x += (bait.x - b.x) / 10;
                        b.y += (bait.y - b.y) / 10;
                    }
                    ctx.lineVertex(b.x, b.y);
                });

                ctx.lineVertex(bugs[0].x, bugs[0].y);

                ctx.endLine();
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
