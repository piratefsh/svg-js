import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import SVGContext from "./contexts/SVGContext";
import P5Context from "./contexts/P5Context";

const makeDrawing = ({ Context, width, height }) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
        styles: {
            strokeWidth: 1,
            stroke: "hsla(200, 50%, 50%, 0.6)",
            fill: "none"
        }
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
    const width = 100;
    const height = 100;

    makeDrawing({ Context: P5Context, width, height });
    // makeDrawing({ Context: SVGContext, width, height });
};

main();
