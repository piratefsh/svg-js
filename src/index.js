import "./styles/index.scss";
import { makeContextContainer } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./components/P5Context";
import SVGContext from "./components/SVGContext";

const makeDrawing = ({ Context, width, height }) => {
    const parent = makeContextContainer(Context.NAME);
    const options = {
        ctx: new Context(parent, width, height),
        width,
        height,
        styles: {
            strokeWidth: 4,
            stroke: "orangered"
        }
    };
    const instance = new Drawing(options);
    instance.draw();
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = `Save ${Context.NAME}`;
    document.body.appendChild(saveBtn);
    saveBtn.addEventListener("click", () => instance.save());
};
const main = () => {
    const width = 300;
    const height = 300;

    makeDrawing({ Context: P5Context, width, height });
    makeDrawing({ Context: SVGContext, width, height });
};

main();
