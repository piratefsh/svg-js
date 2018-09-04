import SVG from "svg.js";
import "./styles/index.scss";
import { debugAttr } from "./helpers";
import LSystem from "./LSystems";

const width = 400;
const height = 400;

const canvas = SVG("my-drawing").size(width, height);
const inner = canvas.nested();
inner.rect(width, height).attr(debugAttr);
inner.x(width / 2).y(height);

const binaryTree = new LSystem({
    ctx: inner,
    name: "binary tree",
    angle: 30,
    axiom: "X",
    rules: {
        X: "F[-X][+X]"
    },
    iterations: 4,
    length: 36
});

const weed = new LSystem({
    ctx: inner,
    name: "fuzzy weed",
    angle: 22.5,
    axiom: "X",
    rules: {
        X: "F-[[X]+X]+F[+FX]-X",
        F: "FF"
    },
    length: 5,
    iterations: 5
});

weed.run(5);
// binaryTree.run(4);
