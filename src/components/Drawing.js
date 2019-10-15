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
            let numSeeds = 40;
            while(seeds.length < numSeeds){
                const seed = {
                    id: seeds.length,
                    pos: {
                        x: Math.trunc(random(50, width-50)),
                        y: Math.trunc(random(50, height-50))
                    },
                    radius: Math.trunc(random(10, 30)),
                    growthVel: {x: random(3, 8), y: random(-5, 5)},
                    growthAcc: {x: random(1, 2), y: random(-1, 1)},
                    growing: true,
                    viable: true
                };

                if(!this.crowded(seeds, seed)){
                    seeds.push(seed);
                }
            }

            let rounds = 0

            while(this.hasGrowing(seeds)){
                rounds++
                seeds.forEach(seed => {
                    this.drawSeed(seed);
                    if (this.canGrowWithoutCrowding(seeds, seed)) {
                        this.grow(seed);
                    } else {
                        this.stop(seed);
                    }
                });
            }

            seeds.forEach(seed => this.drawSeed(seed))

            console.log(rounds)

        });
    }

    crowded(seeds, seed){
        return this.intersects(seeds, seed) || this.reachedBounds(seed, this.center, this.width / 2)
    }

    drawSeed(seed) {
        this.ctx.ellipse(seed.radius*2, seed.radius*2, seed.pos.x, seed.pos.y);
    }

    hasGrowing(seeds) {
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
            if (other.id == seed.id) {
                continue;
            }
            if (dist(other.pos, seed.pos) < other.radius + seed.radius) {
                return true;
            }
        }
        return false;
    }

    stop(seed) {
        seed.growing = false;
    }

    canGrowWithoutCrowding(seeds, seed){
        const hypothetical = Object.assign({}, seed)
        this.grow(hypothetical)
        return !this.crowded(seeds, hypothetical)
    }

    grow(seed) {
        const { growthVel: vel, pos, growthAcc: acc } = seed
        // seed.pos.x += vel.x;
        // seed.pos.y += vel.y;
        seed.radius = vel.x;
        seed.growthVel.x += acc.x;
        seed.growthVel.y += acc.y;
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
