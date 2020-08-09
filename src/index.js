import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height, ...rest }) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
        ...rest
    };
    const instance = new Drawing(options);
    instance.draw();
    makeSaveButton({
        label: `Download`,
        fn: () => instance.save(),
        element: document.getElementById('save-btn')
    });
};
const main = () => {
    const width = 500;
    const height = 500;

    // makeDrawing({ Context: P5Context, width, height });

    const inputs = {
        iters: document.getElementById('iters-input'),
        strokeColor: document.getElementById('strokeColor-input'),
        bgColor: document.getElementById('bgColor-input'),
        strokeWidth: document.getElementById('strokeWidth-input')
    }

    Object.keys(inputs).forEach((key) => {
        const input = inputs[key];
        input.addEventListener('change', (e) => {
            const iters = e.target.value;
            //remove old drawing if exists
            const old = document.querySelector('.container')
            if(old) old.remove();

            //make new drawing
            makeDrawing({ Context: SVGContext, width, height,
                iters:  inputs.iters.value,
                bgColor: inputs.bgColor.value,
                strokeColor: inputs.strokeColor.value,
                strokeWidth: inputs.strokeWidth.value
            });
        });
    })

    // trigger first drawing
    inputs.iters.dispatchEvent(new Event('change'))
};

main();
