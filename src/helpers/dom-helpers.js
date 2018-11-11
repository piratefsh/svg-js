const makeSaveButton = ({ label, fn, element }) => {
    let saveBtn;
    if (element) {
        saveBtn = element;
    } else {
        saveBtn = document.createElement("button");
        saveBtn.innerHTML = label;
        document.body.appendChild(saveBtn);
    }
    saveBtn.addEventListener("click", fn);
};

const makeContextContainer = (id = "drawing") => {
    const node = document.createElement("div");
    node.id = id;
    document.getElementById("wrapper").appendChild(node);

    return node;
};

export { makeSaveButton, makeContextContainer };
