import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import VariedWidthLineTexture from "./components/VariedWidthLineTexture";
import LineTexture from "./components/LineTexture";
import CircleTexture from "./components/CircleTexture";
import RectTexture from "./components/RectTexture";
import ArcTexture from "./components/ArcTexture";
import GridTexture from "./components/GridTexture";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({
    Context,
    width,
    height,
    drawingOptions,
    texture: TextureClass
}) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height
    };

    Object.assign(options, drawingOptions);

    const instance = new TextureClass(options);
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

    const textures = [
        // ArcTexture,
        // VariedWidthLineTexture,
        LineTexture
        // RectTexture,
        // CircleTexture
    ];
    for (let n = 0; n < textures.length; n += 1) {
        makeDrawing({
            Context: SVGContext,
            width,
            height,
            texture: GridTexture,
            drawingOptions: {
                nrows: 3,
                ncols: 3,
                scale: 3,
                TextureClass: textures[n],
                styles: {
                    strokeWidth: 1,
                    stroke: "hsla(0, 0%, 0%, 1.0)"
                }
            }
        });
    }
};

main();
