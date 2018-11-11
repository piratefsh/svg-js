import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import CircleTexture from "./components/CircleTexture";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height, drawingOptions }) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height
    };

    Object.assign(options, drawingOptions);

    const instance = new CircleTexture(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}`,
        fn: () => instance.save(),
        element: ctx.getDOMElement()
    });
};
const main = () => {
    const width = 300;
    const height = 300;

    for (let i = 100; i < 1800; i += 200) {
        makeDrawing({
            Context: P5Context,
            width,
            height,
            drawingOptions: {
                numStrokes: i,
                styles: {
                    strokeWidth: 2,
                    stroke: "hsla(0, 0%, 30%, 0.3)"
                }
            }
        });
    }
    // makeDrawing({ Context: SVGContext, width, height });
};

main();
