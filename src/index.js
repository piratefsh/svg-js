import SVG from "svg.js";
import "./styles/index.scss";
import ParametricPatterns from "./ParametricPatterns";

const width = 350;
const height = 300;

const fitCanvas = (canvas, inner) => {
    const bb = inner.bbox();
    canvas.viewbox(bb.x, bb.y, bb.width, bb.height);
};

const makeExample = options => {
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
    const system = new ParametricPatterns(opts);
    system.draw();

    node.innerHTML += `<p>${system.equations().join('<br/>')}</p>`;

    // fitCanvas(parent, ctx);
};

const cellSizeX = width;
const cellSizeY = height;

for(let n = 0; n < 6; n++){
    makeExample({
        name: 'parametric-' + n,
        x: 0,
        y: 0,
        width: cellSizeX,
        height: cellSizeY,
        color: [0, 0, 0],
        numLines: 120,
        spacing: 0.07,
        speed: 0.005,
        amp: 1.2
    });
}
