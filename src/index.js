import "./styles/index.scss";
import { makeContextContainer } from "./helpers/dom-helpers";
import Drawing from "./components/Drawing";
import P5Context from "./components/P5Context";
import SVGContext from "./components/SVGContext";

const main = () => {
    const width = 300;
    const height = 300;
    const parentP5 = makeContextContainer("p5-context");
    const parentSVG = makeContextContainer("svg-context");

    const optionsP5 = {
        ctx: new P5Context(parentP5, width, height),
        width,
        height,
        styles: {
            strokeWidth: 4,
            stroke: 'orangered'
        }
    };
    const instanceP5 = new Drawing(optionsP5);
    instanceP5.draw();

    const optionsSVG = {
        ctx: new SVGContext(parentSVG, width, height),
        width,
        height,
        styles: {
            strokeWidth: 4,
            stroke: 'orangered'
        }
    };
    const instanceSVG = new Drawing(optionsSVG);
    instanceSVG.draw();
};

main();
