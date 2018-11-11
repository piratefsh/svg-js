import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import CircleTexture from "./components/CircleTexture";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height }) => {
    const parent = makeContextContainer(Context.NAME);
    const options = {
        ctx: new Context(parent, width, height),
        width,
        height,
        styles: {
            strokeWidth: 2,
            stroke: "hsl(0, 0%, 50%)",
            opacity: 0.4
        }
    };
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

    makeDrawing({ Context: P5Context, width, height });
    makeDrawing({ Context: SVGContext, width, height });
};

main();
