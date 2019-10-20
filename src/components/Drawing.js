import {
    random,
    randomSelect,
    translate,
    rotate,
    dist,
    mult,
    normalize,
    map
} from "../helpers/math";

const PI = Math.PI;
const TWO_PI = 2 * PI;

export default class Drawing {
    constructor({ styles, ctx, width, height }) {
        // add defaults
        this.styles = Object.assign(
            {
                stroke: "hsla(340, 100%, 50%, 0.7)",
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
            let numSeeds = 70;
            let count = 0;
            while (seeds.length < numSeeds) {
                count++;
                const pos = {
                    x: Math.trunc(random(50, width - 50)),
                    y: Math.trunc(random(50, height - 50))
                };
                const radius = Math.trunc(
                    map(5, 60, 0, width, dist(pos, center))
                );
                // console.log(pos.x, pos.y, Math.trunc(dist(pos, center)), radius)
                const seed = {
                    id: seeds.length,
                    pos,
                    radius,
                    growthVel: { x: random(3, 8), y: random(-5, 5) },
                    growthAcc: { x: random(1, 2), y: random(-1, 1) },
                    // growthVel: { x: 1, y: 1 },
                    // growthAcc: { x: 1, y: 1 },
                    growing: true,
                    viable: true
                };

                if (!this.crowded(seeds, seed)) {
                    seeds.push(seed);
                }
            }

            let rounds = 0;

            while (this.hasGrowing(seeds)) {
                rounds++;
                seeds.forEach(seed => {
                    // this.drawSeed(seed);
                    if (this.canGrowWithoutCrowding(seeds, seed)) {
                        this.grow(seed);
                    } else {
                        this.stop(seed);
                    }
                });
            }

            seeds.forEach(seed => this.drawSeed(seed));

            console.log(rounds);
        });
    }

    crowded(seeds, seed) {
        return (
            this.intersects(seeds, seed) ||
            this.reachedBounds(seed, this.center, this.width / 2)
        );
    }

    drawSeed(seed) {
        const scale = [6, 12, 18]
        const { radius, pos } = seed;
        const numPetals = radius < 8 ? scale[2] : randomSelect(scale);
        const offsetR = random(0, Math.PI);
        const thickness =
            numPetals == scale[0]
                ? randomSelect([1, 2, 3])
                : numPetals == scale[1]
                ? randomSelect([1, 2])
                : 1;
        for (let i = 0; i < numPetals; i++) {
            const theta = offsetR + (i / numPetals) * TWO_PI;
            const x = radius * Math.sin(theta);
            const y = radius * Math.cos(theta);
            this.ctx.thickLine(pos.x, pos.y, pos.x + x, pos.y + y, thickness);
        }
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

    canGrowWithoutCrowding(seeds, seed) {
        const hypothetical = Object.assign({}, seed);
        this.grow(hypothetical);
        return !this.crowded(seeds, hypothetical);
    }

    grow(seed) {
        const { growthVel: vel, pos, growthAcc: acc } = seed;
        // seed.pos.x += vel.x;
        // seed.pos.y += vel.y;
        seed.radius = vel.x;
        seed.growthVel.x += acc.x;
        seed.growthVel.y += acc.y;
    }

    save() {
        this.ctx.save();
    }
}
