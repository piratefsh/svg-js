import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

let counter = 0;

const makeDrawing = ({ Context, width, height }) => {
    const parent = document.body;
    parent.innerHTML = '';
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
        seed: counter++
    };
    const instance = new Drawing(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}`,
        fn: () => instance.save(),
        element: ctx.getDOMElement()
    });
};
const main = () => {
    const width = 400;
    const height = 400;

    const frame = () => {
        makeDrawing({ Context: SVGContext, width, height });
        
        setTimeout(() => requestAnimationFrame(frame), 1000);

    };
    requestAnimationFrame(frame);
    // makeDrawing({ Context: P5Context, width, height });
};

main();
