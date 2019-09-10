import {
    set,
    get,
    numNeibs,
    transliterate,
    idxToCoord,
    coordToIdx,
    normalizeCoords,
    xl
} from "./explor";

const s2u = canvas => {
    const t = new Uint8Array(canvas.length);
    canvas.forEach((p, i) => {
        set(t, i, `${p}`);
    });
    return t;
};

const u2s = canvas => {
    const t = new Array(canvas.length);
    canvas.forEach((p, i) => {
        t[i] = get(canvas, i);
    });
    return t;
};
describe("explor", () => {
    describe("transliterate", () => {
        it("should transliterate single element", () => {
            const canvas = s2u(["a"]);
            transliterate(canvas, 0, 1, "ab");
            expect(get(canvas, 0)).toBe("b");
        });

        it("should not transliterate nonexistent element", () => {
            const canvas = s2u(["a"]);
            transliterate(canvas, 0, 1, "cd");
            expect(get(canvas, 0)).toBe("a");
        });
    });

    describe("normalizeCoords", () => {
        it("should wrap around", () => {
            expect(normalizeCoords([1, 3], 3, 3)).toEqual([1, 0]);
        });
    });

    describe("numNeibs", () => {
        it("should detect neighbour above", () => {
            const canvas = s2u([1, 2, 3, 4, "a", 5, 6, 7, 8]);

            canvas.width = 3;
            canvas.height = 3;
            expect(numNeibs(canvas, 4, "A", "2")).toBe(1);
            expect(numNeibs(canvas, 4, "N", "3")).toBe(1);
            expect(numNeibs(canvas, 4, "R", "5")).toBe(1);
            expect(numNeibs(canvas, 4, "E", "8")).toBe(1);
            expect(numNeibs(canvas, 4, "B", "7")).toBe(1);
            expect(numNeibs(canvas, 4, "S", "6")).toBe(1);
            expect(numNeibs(canvas, 4, "L", "4")).toBe(1);
            expect(numNeibs(canvas, 4, "W", "1")).toBe(1);
        });

        it("should wrap around", () => {
            const canvas = s2u([1, 2, 3, 4, "a", 5, 6, 7, 8]);

            canvas.width = 3;
            canvas.height = 3;
            expect(numNeibs(canvas, coordToIdx(3, 3, [1, 0]), "A", "7")).toBe(
                1
            );
            expect(numNeibs(canvas, coordToIdx(3, 3, [2, 1]), "R", "4")).toBe(
                1
            );
            expect(numNeibs(canvas, coordToIdx(3, 3, [1, 2]), "B", "2")).toBe(
                1
            );
            expect(numNeibs(canvas, coordToIdx(3, 3, [0, 1]), "L", "5")).toBe(
                1
            );
        });
    });

    describe("idxToCoord", () => {
        it("should return correct coord", () => {
            const canvas = [0, 1, 2, 3, 4, 5, 6, 7, 8];

            expect(idxToCoord(3, 3, 0)).toEqual([0, 0]);
            expect(idxToCoord(3, 3, 2)).toEqual([2, 0]);
            expect(idxToCoord(3, 3, 3)).toEqual([0, 1]);
            expect(idxToCoord(3, 3, 4)).toEqual([1, 1]);
            expect(idxToCoord(3, 3, 8)).toEqual([2, 2]);
        });
    });

    describe("coordToIdx", () => {
        it("should return correct coord", () => {
            const canvas = [0, 1, 2, 3, 4, 5, 6, 7, 8];

            expect(coordToIdx(3, 3, [0, 0])).toEqual(0);
            expect(coordToIdx(3, 3, [2, 0])).toEqual(2);
            expect(coordToIdx(3, 3, [0, 1])).toEqual(3);
            expect(coordToIdx(3, 3, [1, 1])).toEqual(4);
            expect(coordToIdx(3, 3, [2, 2])).toEqual(8);
        });
    });

    describe("xl", () => {
        it("should set lookup", () => {
            const canvas = new Uint8Array(3);
            set(canvas, 0, "a");
            set(canvas, 1, "a");
            set(canvas, 2, "a");
            xl(canvas, [1, 1], 1, "a3");
            expect(canvas).toEqual(s2u(["3", "3", "3"]));
        });
    });
});
