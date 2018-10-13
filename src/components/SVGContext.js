import SVG from "svg.js";
import ContextInterface from "./ContextInterface";

const STYLE_NAME_MAP = {
    strokeWidth: "stroke-width"
};

export default class SVGContext extends ContextInterface {
    instantiate(parentNode) {
        // make svg node
        this.instance = SVG(parentNode.id).size(this.width, this.height);
    }

    setStyles(s) {
        const normalizedStyles = Object.keys(s).reduce((acc, key) => {
            if (key in STYLE_NAME_MAP) {
                acc[STYLE_NAME_MAP[key]] = s[key];
            } else {
                acc[key] = s[key];
            }
            return acc;
        }, {});
        this.styles = Object.assign(normalizedStyles, this.styles);
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

    draw(fn) {
        fn();
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

SVGContext.NAME = "SVGContext";
