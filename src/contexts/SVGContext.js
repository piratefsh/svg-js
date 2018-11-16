import SVG from "svg.js";
import { polarToCartesian } from "../helpers/math";
import ContextInterface from "./ContextInterface";

const STYLE_NAME_MAP = {
    strokeWidth: "stroke-width"
};

const QUAD_COLOR_REGEXP = /([.0-9]{1,4}%?)/g;
const COLOR_WITH_ALPHA_REGEX = /(hsla|rgba)\(.*\)/;

// turn (hsl|rgb)a colors into (hsl|rgb) and opacity
function parseColor(key, val) {
    const str = `${val}`;
    const format = str.match(COLOR_WITH_ALPHA_REGEX);
    if (format) {
        const matches = str.match(QUAD_COLOR_REGEXP);
        if (matches) {
            const styles = {};
            const [x, y, z, a] = matches;
            const formatWithoutAlpha = format[1].substring(0, 3);
            styles[key] = `${formatWithoutAlpha}(${x}, ${y}, ${z})`;
            styles[`${key}-opacity`] = a;
            return styles;
        }
    }
    return {};
}

function parseStyle(key, val) {
    const styles = {};
    if (key in STYLE_NAME_MAP) {
        styles[STYLE_NAME_MAP[key]] = val;
    } else {
        styles[key] = val;
    }

    return Object.assign(styles, parseColor(key, val));
}

export default class SVGContext extends ContextInterface {
    instantiate(parentNode) {
        // make svg node
        this.instance = SVG(parentNode.id).size(this.width, this.height);
    }

    setStyles(s) {
        const normalizedStyles = Object.keys(s).reduce(
            (acc, key) => Object.assign(acc, parseStyle(key, s[key])),
            {}
        );
        this.styles = Object.assign(this.styles, normalizedStyles);
    }

    line(x1, y1, x2, y2) {
        return this.instance
            .path(`M ${x1} ${y1} L ${x1} ${y1} ${x2} ${y2}`)
            .attr(this.styles);
    }

    ellipse(sizeX, sizeY, x, y) {
        return this.instance
            .ellipse(sizeX, sizeY)
            .cx(x)
            .cy(y)
            .attr(this.styles);
    }

    rect(sizeX, sizeY, x, y) {
        return this.instance
            .rect(sizeX, sizeY)
            .cx(x + sizeX / 2)
            .cy(y + sizeY / 2)
            .attr(this.styles);
    }

    arc(x, y, radX, radY, startRadian, stopRadian) {
        const rotation = 0;
        const largeArcFlag = 0;
        const sweepFlag = 0;
        const start = polarToCartesian(radX, radY, stopRadian);
        const end = polarToCartesian(radX, radY, startRadian);
        return this.instance
            .path(
                `M ${start.x + x} ${start.y +
                    y} A ${radX} ${radY} ${rotation} ${largeArcFlag} ${sweepFlag} ${end.x +
                    x} ${end.y + y}`
            )
            .attr(this.styles);
    }

    point(x, y) {
        return this.ellipse(0.5, 0.5, x, y);
    }

    cubicBezier(start, points) {
        const curvePoints = points
            .map((p, i) => {
                if (i === 0) {
                    return `C ${p.join(" ")}`;
                }

                const [, , ...rest] = p;
                return `S ${rest.join(" ")}`;
            })
            .join(",");
        const [x, y] = start;
        return this.instance.path(`M ${x} ${y} ${curvePoints}`)
            .attr(this.styles);
    }

    /* eslint-disable class-methods-use-this */
    draw(fn) {
        fn();
    }

    getDOMElement() {
        return this.instance.node;
    }

    save() {
        const svgEl = this.instance.node;
        const name = this.saveFileName();
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const svgData = svgEl.outerHTML;
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgBlob = new Blob([preface, svgData], {
            type: "image/svg+xml;charset=utf-8"
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        downloadLink.innerHTML = "download";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
