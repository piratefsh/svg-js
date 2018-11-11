import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import CircleTexture from "./components/CircleTexture";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height, drawingOptions }) => {
    const parent = makeContextContainer(Context.NAME);
    const options = {
        ctx: new Context(parent, width, height),
        width,
        height
    };

    Object.assign(options, drawingOptions);

    const instance = new CircleTexture(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}`,
        fn: () => instance.save()
    });
};
const main = () => {
    const width = 300;
    const height = 300;

    for (let i = 100; i < 1000; i += 200) {
        makeDrawing({
            Context: P5Context,
            width,
            height,
            drawingOptions: {
                numStrokes: i,
                styles: {
                    strokeWidth: 2,
                    stroke: "hsla(0, 0%, 50%, 0.1)"
                }
            }
        });
    }
    // makeDrawing({ Context: SVGContext, width, height });
};

main();
