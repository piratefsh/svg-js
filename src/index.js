import SVG from "svg.js";
import "./styles/index.scss";
import LSystem from "./LSystem";
import examples from "./LSystemExamples";

const fitCanvas = (canvas, inner) => {
    const bb = inner.bbox();
    canvas.viewbox(bb.x, bb.y, bb.width, bb.height);
};

const makeExample = options => {
    const width = 250;
    const height = 250;

    // make parent element
    const id = options.name;
    const node = document.createElement("div");
    node.id = id;
    document.body.appendChild(node);

    // make svg
    const parent = SVG(id).size(width, height);
    const ctx = parent.nested();

    const opts = Object.assign(
        {
            ctx,
            width,
            height
        },
        options
    );
    const system = new LSystem(opts);

    system.run(options.iterations);
    fitCanvas(parent, ctx);
};

for (let i = 1; i <= 3; i++) {
    makeExample({
        name: "stained glass windows",
        angle: 45,
        axiom: "H++H++H++H",
        rules: {
            // F: "X--K+Y++Y+K--X",
            H: "H++K-H--H-K++H",
            K: "H"
        },
        iterations: i,
        lengths: {
            default: 12,
            K: 6
        }
    });
}
// examples.forEach(e => {
// });
