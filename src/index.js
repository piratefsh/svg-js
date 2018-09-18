import SVG from "svg.js";
import "./styles/index.scss";
import ParametricPatterns from "./ParametricPatterns";

const width = 500;
const height = 500;

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
    fitCanvas(parent, ctx);
};

const offsetX = 0;
const offsetY = 0;
const cellSizeX = width;
const cellSizeY = height;
const i = 0;
const j = 0;

makeExample({
    name: 'parametric',
    x: i * cellSizeX + offsetX,
    y: j * cellSizeY + offsetY,
    width: cellSizeX,
    height: cellSizeY,
    color: [0, 0, 0],
    numLines: 100,
    spacing: 0.2,
    speed: 0.005,
    amp: 1.2
});
