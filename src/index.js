import "./styles/index.scss";
import { makeContextContainer, makeSaveButton } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./contexts/P5Context";
import SVGContext from "./contexts/SVGContext";

const makeDrawing = ({ Context, width, height, ...others }) => {
    const parent = makeContextContainer(Context.NAME);
    const ctx = new Context(parent, width, height);
    const options = {
        ctx,
        width,
        height,
        ...others
    };
    const instance = new Drawing(options);
    instance.draw();
    makeSaveButton({
        label: `Save ${Context.name}.svg`,
        fn: () => instance.save(),
        element: document.getElementById('save-btn')
    });

    document.querySelector('.loading').classList.remove('show');

};
const main = () => {
    const width = 800;
    const height = 800;

    // makeDrawing({ Context: P5Context, width, height });
    makeDrawing({ Context: SVGContext, width, height });

    const inputs = {
        snowflakeIters: document.getElementById('snowflake-iters-input'),
        iters: document.getElementById('iters-input'),
        strokeColor: document.getElementById('strokeColor-input'),
        bgColor: document.getElementById('bgColor-input'),
        strokeWidth: document.getElementById('strokeWidth-input'),
        overlap: document.getElementById('overlap-input'),
    }

    Object.keys(inputs).forEach((key) => {
        const input = inputs[key];
        input.addEventListener('change', (e) => {
            const iters = e.target.value;
            //remove old drawing if exists
            const old = document.querySelector('.container')
            if(old) old.remove();

            // indicate wait
            document.querySelector('.loading').classList.add('show');

            setTimeout(() => {
                //make new drawing
                makeDrawing({ Context: SVGContext, width, height,
                    snowflakeIters:  inputs.snowflakeIters.value,
                    iters:  inputs.iters.value,
                    bgColor: inputs.bgColor.value,
                    strokeColor: inputs.strokeColor.value,
                    strokeWidth: inputs.strokeWidth.value,
                    canOverlap: inputs.overlap.checked
                });
            }, 300)

        });
    })

    // trigger first drawing
    inputs.iters.dispatchEvent(new Event('change'))
};

main();
