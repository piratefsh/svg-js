import "./styles/index.scss";
import { makeSVGContainer, addSaveLink } from "./dom-helpers";
import Drawing from "./Drawing";

const main = () => {
    const width = 300;
    const height = 300;
    const parent = makeSVGContainer(width, height);
    const options = {
        ctx: parent,
        width,
        height,
        style: {
            strokeWidth: 2
        }
    };
    const instance = new Drawing(options);
    instance.draw();

    addSaveLink(parent.node, `${new Date().toString()}`);
};

main();
