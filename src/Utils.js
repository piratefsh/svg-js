export default class Util {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    static random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    generateParametricEqn(amp = 1, maxFreqDenom = 3) {
        const trigFuncs = ["Math.sin", "Math.cos"];
        const numTerms = 1 + Math.floor(Math.random() * 2);
        const expressions = [];
        for (let i = 0; i < numTerms; i += 1) {
            const trig = this.random(trigFuncs);
            const freq = 1 + Math.random() * (maxFreqDenom - 1);
            const expr = `${amp} * ${trig}(t/${freq})`;
            expressions.push(expr);
        }
        const params = ["t"];
        const body = `return (${expressions.join("+")});`;
        return new Function(...params, body);
    }
}
