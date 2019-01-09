export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "white",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.1)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.gridX = 4;
        this.gridY = 4;
    }

    jitter(max = 10) {
        return Math.random() * max;
    }

    randTrapezium({ x: sx, y: sy }, { x: ex, y: ey }) {
        const { jitter } = this;
        const yJitter = jitter(15);
        return [
            {
                x: sx,
                y: sy + yJitter
            },
            {
                x: ex - jitter(),
                y: sy + yJitter
            },
            {
                x: ex - jitter(),
                y: ey
            },
            {
                x: sx,
                y: ey - jitter()
            }
        ];
    }

    draw() {
        const { ctx, gridX, gridY, width, height } = this;
        ctx.draw(() => {
            ctx.setStyles({ fill: "#222" });
            ctx.rect(this.width, this.height, 0, 0);

            ctx.setStyles(this.styles);
            const cellSizeX = width / gridX;
            const cellSizeY = height / gridY;

            const polygons = [];
            for (let i = 0; i < gridX; i++) {
                for (let j = 0; j < gridY; j++) {
                    const vertices = this.randTrapezium(
                        {
                            x: i * cellSizeX,
                            y: j * cellSizeY
                        },
                        {
                            x: i * cellSizeX + cellSizeX,
                            y: j * cellSizeY + cellSizeY
                        }
                    );

                    polygons.push(vertices)
                    ctx.polygon(vertices);
                }
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
