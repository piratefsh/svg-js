import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

let counter = 0;

const seed = Math.random();

const makeDrawing = ({ Context, width, height }) => {
    const parent = document.body;
    parent.innerHTML = "";
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
        seed: seed,
        time: counter
    };
    counter += 0.1;
    const instance = new Drawing(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}`,
        fn: () => instance.save(),
        element: ctx.getDOMElement()
    });
};
const main = () => {
    const width = 500;
    const height = 500;

    const frame = () => {
        // makeDrawing({ Context: SVGContext, width, height });
        // requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    makeDrawing({ Context: SVGContext, width, height });
};

main();
