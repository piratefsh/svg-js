import SVG from 'svg.js';
import './styles/index.scss';
import FourFlies from './FourFlies';
import {debugAttr} from './helpers';

const width = 600
const height = 600

const canvas = SVG('my-drawing')
  .size(width, height);

const grid = {
  x: 3,
  y: 3
}
const gw = width/grid.x
const gh = height/grid.y
const rad = gw/2;
const a = Math.sqrt(3) * rad;
const triHeight = Math.sqrt(3)/2 * a
const off = rad*2 - triHeight;

for(let i = 0; i < grid.x * 2 + 2; i++){
  for(let j = 0; j < grid.y * 2; j++){
    const offsetY = i % 2 ? 0 : off;
    const rotOffset = i % 2 ? 0 : Math.PI 
    const inner = canvas.nested(gw, gh)

    inner
      .cx(i*(gh - (gh-a))/2)
      .cy(j*(gw-off) + offsetY)
    inner
      .rect(gw, gh)
      .cx(0)
      .cy(0)
      .attr(debugAttr)
    // inner
    //   .ellipse(5, 5)
    //   .cx(0)
    //   .cy(0)
    //   .attr({fill: 'red'})

    const g = new FourFlies(inner, gw, gh, 13, 3, rotOffset)
    g.draw()
  }
}