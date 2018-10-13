import "./styles/index.scss";
import { makeContextContainer, addSaveLink } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./components/P5Context";
import SVGContext from "./components/SVGContext";
const main = () => {
    const width = 300;
    const height = 300;
    const parent = makeContextContainer();
    const context = new SVGContext(parent, width, height);
    const options = {
        ctx: context,
        width,
        height,
        style: {
            strokeWidth: 2
        }
    };
    const instance = new Drawing(options);
    instance.draw();

    // addSaveLink(parent.node, `${instance.getName()}-${new Date().toString()}`);
};

main();
