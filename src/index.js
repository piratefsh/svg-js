import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import StrangeAttractor from "./components/StrangeAttractor";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height }) => {
    const parent = makeContextContainer(Context.NAME);
    const options = {
        ctx: new Context(parent, width, height),
        width,
        height,
        styles: {
            strokeWidth: 1,
            stroke: "rgba(0, 0, 0, 0.1)"
        },
        constants: {
            A1: 0,
            F1: Math.random(),
            A2: 0,
            F2: 1.902,
            A3: 0,
            F3: 1.316,
            A4: 0,
            F4: Math.random()
        }
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
    const width = 600;
    const height = 600;

    makeDrawing({ Context: P5Context, width, height });
    // makeDrawing({ Context: SVGContext, width, height });
};

main();
