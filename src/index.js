import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import StrangeAttractor from "./components/StrangeAttractor";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height, constants }) => {
    const parent = makeContextContainer(Context.NAME);
    const options = {
        ctx: new Context(parent, width, height),
        width,
        height,
        styles: {
            strokeWidth: 1,
            stroke: "rgba(0, 0, 0, 0.4)"
        },
        numPoints: 30000,
        constants
    };

    console.log(options.constants)
    const instance = new StrangeAttractor(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}`,
        fn: () => instance.save()
    });
};
const main = () => {
    const width = 500;
    const height = 500;

    const constants = {
        A1: 0.00001,
        F1: Math.random() + 1,
        A2: 0.00001,
        F2: 1.602,
        A3: 0.00001,
        F3: -1.316,
        A4: 0.0001,
        F4: Math.random() + 1.2
    }
    makeDrawing({ Context: P5Context, width, height, constants });
    makeDrawing({ Context: SVGContext, width, height, constants });
};

main();
