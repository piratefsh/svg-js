import SVG from "svg.js";
import "./styles/index.scss";
import ParametricPatterns from "./ParametricPatterns";

const width = 900;
const height = 900;

const fitCanvas = (canvas, inner) => {
    const bb = inner.bbox();
    canvas.viewbox(bb.x, bb.y, bb.width, bb.height);
};

const saveSvg = (svgEl, name) => {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = svgEl.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8"
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

const makeExample = ({ parent, instance }) => {

    // set ctx for instance to draw on
    instance.setCtx(parent);

    // add metadata
    const metadata = document.createElement("metadata");
    metadata.innerHTML = instance.equations().join(";");
    parent.add({ node: metadata });

    instance.draw();
    // fitCanvas(parent, ctx);
};

const numShots = 3;
const cellSizeX = width / numShots;
const cellSizeY = height / numShots;
const opts = {
    x: 0,
    y: 0,
    width: cellSizeX,
    height: cellSizeY,
    color: [0, 0, 0],
    numLines: 80,
    spacing: 0.07,
    speed: 0.005,
    amp: 1.2,
    padding: width*0.05,
};
const instance = new ParametricPatterns(opts);

// make parent element
const id = 'parametric';
const node = document.createElement("div");
node.id = id;
document.body.appendChild(node);

// make svg
const parent = SVG(id).size(width, height);

for (let n = 0; n < numShots; n++) {
    for (let m = 0; m < numShots; m++) {
        const theta =
            ((Math.PI * 2) / (numShots*numShots)) * (n * numShots + m);
            console.log(theta)
        instance.setPhase(theta);
        instance.setPosition({ x: m * cellSizeX, y: n * cellSizeY });
        makeExample({
            parent,
            instance,
            name: `parametric-${n}`,
        });
    }
}

saveSvg(parent.node, `${new Date().toString()}`);

