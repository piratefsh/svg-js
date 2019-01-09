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

        this.gridX = 3;
        this.gridY = 3;

        this.linePerCell = 20;

        this.gutter = 24;
    }

    jitter(max = 10) {
        return Math.random() * max;
    }

    randTrapezium({ x: sx, y: sy }, { x: ex, y: ey }) {
        const { jitter } = this;
        const vertices = [
            {
                x: sx,
                y: sy
            },
            {
                x: ex,
                y: sy
            },
            {
                x: ex,
                y: ey
            },
            {
                x: sx,
                y: ey
            }
        ];

        // pick 2-3 vertices to shift
        return vertices.map((v, i) => {
            if (Math.random() < 0.5) {
                if (i < 2) {
                    v.y += jitter();
                } else {
                    v.y -= jitter();
                }

                if (i == 0 || i == 3) {
                    v.x += jitter();
                } else {
                    v.x -= jitter();
                }
            }
            return v;
        });
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
            ctx.setStyles(this.styles);

            ctx.rect(this.width, this.height, 0, 0);

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
                    // ctx.rect(
                    //     cellSizeX,
                    //     cellSizeY,
                    //     gutter + i * cellSizeX,
                    //     gutter + j * cellSizeX
                    // );
                }
            }

            const numLines = gridX * this.linePerCell;
            const step = (width - gutter * 2) / numLines;
            for (let i = 0; i < numLines; i += 1) {
                const ls = { x: i * step + gutter, y: 0 + gutter - 5 };
                const le = { x: i * step + gutter, y: height - gutter + 5 };

                const pointsOfIntersections = polygons
                    .reduce((acc, p, j) => {
                        const lines = this.getPolyEdges(p);
                        const ints = lines.map(({ s, e }) => intersection(s, e, ls, le));
                        return acc.concat(ints);
                    }, [])
                    .filter(p => p !== false)

                pointsOfIntersections.forEach((p, i) => {
                    ctx.ellipse(3, 3, p.x, p.y);
                });

                pointsOfIntersections.unshift(ls);
                pointsOfIntersections.push(le);
                pointsOfIntersections.sort((a, b) => a.y - b.y);

                for (let j = 0; j < pointsOfIntersections.length - 1; j += 1) {
                    const start = pointsOfIntersections[j];
                    const end = pointsOfIntersections[j + 1];
                    if (j % 2 == 0) {
                        this.ctx.setStyles({ stroke: "rgba(200, 0, 0, 0.3)" });
                        ctx.line(start.x, start.y, end.x, end.y);
                    } else {
                        this.ctx.setStyles({ stroke: "rgba(0, 0, 200, 0.3)" });
                    }
                }
            }
        });
    }

    save() {
        this.ctx.save();
    }
}
