export default class Util {
    static random(arg1, arg2) {
        if (typeof arg1 === "number") {
            if (typeof arg2 === "number") {
                return arg1 + Math.random() * (arg2 - arg1);
            }

            return arg1 * Math.random();
        }
        if (Array.isArray(arg1)) {
            return arg1[Math.floor(Math.random() * arg1.length)];
        }

        return Math.random();
    }

    static generateParametricEqn(amp = 1, maxFreqDenom = 3) {
        const trigFuncs = ["Math.sin", "Math.cos"];
        const numTerms = 1 + Math.floor(Math.random() * 2);
        const expressions = [];
        for (let i = 0; i < numTerms; i += 1) {
            const trig = Util.random(trigFuncs);
            const freq = Math.floor(1 + Math.random() * (maxFreqDenom - 1));
            const expr = `${Math.floor(amp)} * ${trig}(t/${freq})`;
            expressions.push(expr);
        }
        const params = ["t"];
        const expr = expressions.join("+");
        const body = `return (${expr});`;
        // console.log(body)
        return { string: expr, fn: new Function(...params, body) };
    }
}
