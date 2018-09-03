import SVG from 'svg.js';
import './styles/index.scss';
import FourFlies from './FourFlies';

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

for(let i = 0; i < grid.x * 2 + 1; i++){
  for(let j = 0; j < grid.y * 2; j++){

    const rad = Math.sqrt(gw * gw + gh*gh);
    const offsetX = i % 2 ? -rad/2 : -rad;
    const offsetY = i % 2 ? -rad/2 : -rad;

    const rotOffset = i % 2 ? 0 : Math.PI
    const inner = canvas.nested(gw, gh)

    inner
      .cx(i/2*rad)
      .cy(j*(rad) + offsetY)

    inner
      .rect(rad, rad)
      .attr({fill: 'none', stroke: 'red'})
    const g = new FourFlies(inner, gw, gh, 13, 4, rotOffset)
    g.draw()
  }
}