import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height }) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
    };
    const instance = new Drawing(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}.svg`,
        fn: () => instance.save(),
        element: ctx.getDOMElement()
    });
};
const main = () => {
    const width = 500;
    const height = 600;

    // makeDrawing({ Context: P5Context, width, height });
    makeDrawing({ Context: SVGContext, width, height });
};

main();
