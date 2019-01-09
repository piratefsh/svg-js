import { intersection } from "../helpers/vector";

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "#666",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.gridX = 6;
        this.gridY = 6;

        this.gutter = 24;
    }

    jitter(max = 10) {
        return Math.random() * max;
    }

    randTrapezium({ x: sx, y: sy }, { x: ex, y: ey }) {
        const { jitter } = this;
        const yJitter = jitter(20);
        return [
            {
                x: sx,
                y: sy + yJitter
            },
            {
                x: ex - jitter(15),
                y: sy + yJitter
            },
            {
                x: ex - jitter(),
                y: ey
            },
            {
                x: sx + jitter(15),
                y: ey - jitter(15)
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
        const { ctx, gridX, gridY, width, height, gutter } = this;
        ctx.draw(() => {
            ctx.setStyles({ fill: "#efefef" });
            ctx.rect(this.width, this.height, 0, 0);

            ctx.setStyles(this.styles);
            const cellSizeX = (width - gutter * 2) / gridX;
            const cellSizeY = (height - gutter * 2) / gridY;

            const polygons = [];
            for (let i = 0; i < gridX; i++) {
                for (let j = 0; j < gridY; j++) {
                    const vertices = this.randTrapezium(
                        {
                            x: gutter + i * cellSizeX,
                            y: gutter + j * cellSizeY
                        },
                        {
                            x: gutter + i * cellSizeX + cellSizeX,
                            y: gutter + j * cellSizeY + cellSizeY
                        }
                    );

                    polygons.push(vertices);
                    ctx.polygon(vertices);
                    ctx.rect(
                        cellSizeX,
                        cellSizeY,
                        gutter + i * cellSizeX,
                        gutter + j * cellSizeX
                    );
                }
            }

            const numLines = gridX * 15;
            const step = (width - gutter * 2) / numLines;
            for (let i = 0; i < numLines; i += 1) {
                const ls = { x: i * step + gutter, y: 0 + gutter };
                const le = { x: i * step + gutter, y: height - gutter };
                // ctx.line(ls.x, ls.y, le.x, le.y);

                const pointsOfIntersections = polygons
                    .reduce((acc, p) => {
                        const lines = this.getPolyEdges(p);
                        return acc.concat(
                            lines.map(({ s, e }) => intersection(s, e, ls, le))
                        );
                    }, [])
                    .filter(p => p !== false);

                pointsOfIntersections.forEach((p, i) => {
                    // ctx.ellipse(3, 3, p.x, p.y);
                });

                pointsOfIntersections.unshift(ls);
                pointsOfIntersections.push(le);

                for (let j = 0; j < pointsOfIntersections.length; j += 2) {
                    const start = pointsOfIntersections[j];
                    const end = pointsOfIntersections[j + 1];
                    ctx.line(start.x, start.y, end.x, end.y);
                }
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
