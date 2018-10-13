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

export { drawWithMetadata, makeContextContainer };
