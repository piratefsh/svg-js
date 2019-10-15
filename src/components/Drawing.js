import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    mult,
    normalize,
    equiTriangleHeight,
    chordToRad
} from "../helpers/math";
import { grid2d } from "../helpers/grids";

const debug = false;

const DRAW_BG = false;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const THIRD_TWO_PI = TWO_PI / 3;
const ROOT_2 = Math.sqrt(2);

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(340, 100%, 50%, 0.8)",
                strokeWidth: 1,
                fill: "rgba(0, 0, 0, 0.0)"
            },
            styles
        );

        // set drawing contesxt
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.center = { x: width / 2, y: height / 2 };
    }

    draw() {
        const { ctx, styles, width, height, center } = this;
        ctx.draw(() => {
            ctx.setStyles(styles);
            const seeds = [];
            const numSeeds = 10;
            for (let i = 0; i < numSeeds; i++) {
                const seed = {
                    pos: {
                        x: Math.trunc(random(50, width-50)),
                        y: Math.trunc(random(50, height-50))
                    },
                    radius: Math.trunc(random(20, 50)),
                    growthVel: random(2, 5),
                    growthAcc: random(0, 1),
                    growing: true,
                    viable: true
                };

                seeds.push(seed);
            }

            seeds.forEach(seed => {
                if (this.intersects(seeds, seed) ||
                    this.reachedBounds(seed, center, width / 2)
                ) {
                    this.stop(seed);
                    seed.viable = false;
                } else {
                    this.grow(seed);
                }
            });

            seeds.forEach(seed => {
                if (seed.viable) {
                    ctx.setStyles({ stroke: "red" });
                } else {
                    ctx.setStyles({ stroke: "blue" });
                }
                this.drawSeed(seed);
            });
        });
    }

    drawSeed(seed) {
        this.ctx.ellipse(seed.radius*2, seed.radius*2, seed.pos.x, seed.pos.y);
    }

    hasGrowing(s) {
        for (let i = 0; i < seeds.length; i++) {
            const s = seeds[i];
            if (s.growing) {
                return true;
            }
        }

        return false;
    }

    reachedBounds(seed, center, boundsRadius) {
        return dist(seed.pos, center) + seed.radius >= boundsRadius;
    }

    intersects(seeds, seed) {
        for (let i = 0; i < seeds.length; i++) {
            const other = seeds[i];
            if (other == seed) {
                continue;
            }
            if (dist(other.pos, seed.pos) < other.radius + seed.radius) {
                console.log(other.pos, other.radius, seed.pos, seed.radius);
                return true;
            }
        }
        return false;
    }

    stop(seed) {
        seed.growing = false;
    }

    grow(seed) {
        const { growthVel: vel, pos, growthAcc: acc } = seed
        seed.pos.x += vel;
        seed.pos.y += vel;
        seed.growthVel += acc;
    }

    thiccLine(sx, sy, ex, ey, lineWidth = 1) {
        lineWidth = Math.trunc(lineWidth);
        const vec = normalize(rotate({ x: sx - ex, y: sy - ey }, Math.PI / 2));
        for (let i = 0; i < lineWidth; i++) {
            const offset = mult(vec, i - Math.floor(lineWidth / 2));
            const st = translate({ x: sx, y: sy }, offset);
            const en = translate({ x: ex, y: ey }, offset);
            this.ctx.line(st.x, st.y, en.x, en.y);
        }
    }

    thiccDot(x, y, size) {
        for (let i = 0; i < size; i++) {
            this.ctx.ellipse(i, i, x, y);
        }
    }

    save() {
        this.ctx.save();
    }
}
