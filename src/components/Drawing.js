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
            const numSeeds = 5;
            const velMag = 7;
            const accMag = 0.5;
            const branchMag = 1;

            // ctx.ellipse(width-60, height-60, center.x, center.y)
            while (seeds.length < numSeeds) {
                const i = seeds.length / numSeeds;
                const theta = i * PI - PI / 2;
                const pos = {
                    x: width / 2 + ((width - 30) / 2) * Math.sin(PI),
                    y: height / 2 + ((height - 30) / 2) * Math.cos((PI / 4) * i)
                };

                const velX =
                    width / 2 + ((width - 30) / 2) * Math.sin(theta + PI);
                const growthVel = mult(
                    normalize({
                        x: pos.x - velX,
                        y: pos.y - center.y - height / 4
                    }),
                    -velMag
                );
                const seed = {
                    id: seeds.length,
                    pos,
                    radius: randomSelect([1, 4, 9, 16]),
                    growthVel,
                    growthAcc: {
                        x: random(-0.5, 0.5) * accMag,
                        y: random(-2, 0) * accMag
                    },
                    growing: true,
                    viable: true
                };

                if (!this.crowded(seeds, seed)) {
                    seeds.push(seed);
                }
            }

            let rounds = 0;
            const maxRounds = 13;

            while (rounds < maxRounds) {
                rounds++;
                seeds.forEach(seed => {
                    if (!seed.growing) {
                        return;
                    }
                    // this.drawSeed(seed);
                    const isTip = rounds == maxRounds
                    const before = Object.assign({}, seed.pos);

                    if (this.canGrowWithoutCrowding(seeds, seed)) {
                        this.grow(seed);
                    } else {
                        this.stop(seed);
                    }

                    // draw branches
                    const rot = PI + randomSelect([PI / 3]);
                    const { pos } = seed;

                    let normVec = normalize({
                        x: pos.x - before.x,
                        y: pos.y - before.y
                    });

                    const brMag = branchMag * (0.12 + 1 - rounds / maxRounds);

                    if (isTip) {
                        normVec = rotate(normVec, 0);
                    }

                    const normVec1 = rotate(normVec, PI / 3);
                    const normVec2 = rotate(normVec, -PI / 3);

                    ctx.line(
                        before.x,
                        before.y,
                        before.x + normVec.x * 10,
                        before.y + normVec.y * 10
                    );

                    let lineWidth = 3;
                    if (maxRounds - rounds < 2) {
                        lineWidth = maxRounds - rounds + 1;
                    }
                    this.thiccLine(before.x, before.y, pos.x, pos.y, lineWidth);

                    if (isTip || random(0, 1) > 0.3) {
                        this.branch(
                            seed.pos,
                            mult(normVec1, seed.radius * brMag),
                            2,
                            2
                        );
                    }
                    if (isTip || random(0, 1) > 0.3) {
                        this.branch(
                            seed.pos,
                            mult(normVec2, seed.radius * brMag),
                            2,
                            2
                        );
                    }
                });
            }

            // seeds.forEach(seed => this.drawSeed(seed))
        });
    }

    branch(pos, velocity, maxSteps = 3, lineWidth) {
        if (maxSteps == 0) {
            return;
        }

        const { ctx } = this;
        const { x, y } = pos;

        // draw this line
        const end = translate(pos, velocity);
        this.thiccLine(x, y, end.x, end.y, lineWidth);

        this.branch(
            translate(pos, mult(velocity, 1)),
            rotate(mult(velocity, 0.3), Math.PI * 0.2),
            lineWidth,
            maxSteps - 1
        );

        this.branch(
            translate(pos, mult(velocity, 1)),
            rotate(mult(velocity, 0.3), -Math.PI * 0.2),
            lineWidth,
            maxSteps - 1
        );

        this.branch(
            translate(pos, mult(velocity, 0.6)),
            rotate(mult(velocity, 0.4), -Math.PI * 0.25),
            lineWidth,
            maxSteps - 1
        );

        this.branch(
            translate(pos, mult(velocity, 0.5)),
            rotate(mult(velocity, 0.4), Math.PI * 0.25),
            lineWidth,
            maxSteps - 1
        );
    }

    crowded(seeds, seed) {
        return this.reachedRectBounds(seed, this.center, this.width / 2);
    }

    drawSeed(seed) {
        this.ctx.ellipse(
            seed.radius * 2,
            seed.radius * 2,
            seed.pos.x,
            seed.pos.y
        );
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

    reachedRectBounds(seed) {
        const { x, y } = seed.pos;
        const { width, height } = this;
        return x < 0 || y < 0 || x > width || y > height;
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
        seed.radius += Math.abs(vel.x);
        seed.pos.x += vel.x;
        seed.pos.y += vel.y;
        if (pos.x) seed.growthVel.x += acc.x;
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
