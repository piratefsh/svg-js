import SVG from "svg.js";
import "./styles/index.scss";
import CurveStitch from "./CurveStitch";

const addSaveLink = (svgEl, name) => {
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
    downloadLink.innerHTML = "download";
    document.body.appendChild(downloadLink);
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

const makeSVGContainer = (width, height, id = "drawing") => {
    // make parent element
    const node = document.createElement("div");
    node.id = id;
    document.body.appendChild(node);
    // make svg
    const parent = SVG(id).size(width, height);

    return parent;
};

const main = () => {
    const width = 300;
    const height = 300;
    const parent = makeSVGContainer(width, height);
    const options = {
        ctx: parent,
        width,
        height,
        strokeWidth: 2
    };
    const instance = new CurveStitch(options);
    instance.draw20ConcentricCircles();

    addSaveLink(parent.node, `${new Date().toString()}`);
};

main();
