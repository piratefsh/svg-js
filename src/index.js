import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import VariedWidthLineTexture from "./components/VariedWidthLineTexture";
import LineTexture from "./components/LineTexture";
import CircleTexture from "./components/CircleTexture";
import RectTexture from "./components/RectTexture";
import ArcofArcs from "./components/ArcofArcs";
import ArcTexture from "./components/ArcTexture";
import RibbonTexture from "./components/RibbonTexture";
import CircleofCircles from "./components/CircleofCircles";
import GridTexture from "./components/GridTexture";
import SVGContext from "./contexts/SVGContext";
import P5Context from "./contexts/P5Context";

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
    const width = 900/3;
    const height = 900/3;

    const textures = [
        // ArcTexture,
        // RibbonTexture
        // VariedWidthLineTexture,
        // LineTexture
        // RectTexture,
        // CircleTexture,
        // ArcofArcs,
        CircleofCircles
    ];
    for (let n = 0; n < textures.length; n += 1) {
        makeDrawing({
            Context: SVGContext,
            width,
            height,
            texture: GridTexture,
            drawingOptions: {
                nrows: 1,
                ncols: 1,
                fixedScale: 40,
                TextureClass: textures[n],
                styles: {
                    strokeWidth: 1,
                    stroke: "hsla(0, 0%, 0%, 1.0)",
                }
            }
        });
    }
};

main();
