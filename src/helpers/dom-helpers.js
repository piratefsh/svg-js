import SVG from "svg.js";

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

const drawWithMetadata = ({ parent, instance }) => {
    // set ctx for instance to draw on
    instance.setCtx(parent);

    // add metadata node
    const metadata = document.createElement("metadata");
    metadata.innerHTML = instance.getMetadata();
    parent.add({ node: metadata });
    instance.draw();
};

const makeContextContainer = (id = "drawing") => {
    // make parent element
    const node = document.createElement("div");
    node.id = id;
    document.body.appendChild(node);

    return node;
};

export { addSaveLink, drawWithMetadata, makeContextContainer };
