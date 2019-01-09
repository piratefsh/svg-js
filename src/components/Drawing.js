import { intersection } from "../helpers/vector";

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

    getPolyEdges(p) {
        const edges = [];
        for (let i = 0; i < p.length - 1; i++) {
            edges.push({
                s: p[i],
                e: p[i + 1]
            });
        }

        edges.push({ s: p[p.length - 1], e: p[0] });
        return edges;
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

                    polygons.push(vertices);
                    ctx.polygon(vertices);
                }
            }

            const numLines = 30;
            const step = width / numLines;
            for (let i = 0; i < numLines; i += 1) {
                const ls = { x: i * step, y: 0 };
                const le = { x: i * step, y: height };
                ctx.line(ls.x, ls.y, le.x, le.y);

                const pointsOfIntersections = polygons
                    .reduce((acc, p) => {
                        const lines = this.getPolyEdges(p);
                        return acc.concat(
                            lines.map(({ s, e }) => intersection(s, e, ls, le))
                        );
                    }, [])
                    .filter(p => p !== false);

                pointsOfIntersections.forEach(p => {
                    ctx.ellipse(3, 3, p.x, p.y);
                });
            }

            // const s1 = { x: 250, y: 0 };
            // const e1 = { x: 250, y: 220 };
            // const s2 = { x: 100, y: 200 };
            // const e2 = { x: 280, y: 200 };
            // ctx.line(s1.x, s1.y, e1.x, e1.y);
            // ctx.line(s2.x, s2.y, e2.x, e2.y);
        });
    }

    save() {
        this.ctx.save();
    }
}
