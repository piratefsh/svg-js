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

    const offsetX = i % 2 ? -gw/2 : -gw;
    const offsetY = i % 2 ? -gh/2 : -gh;
    const inner = canvas.nested(gw, gh)
    inner
      .cx(i/2*gw)
      .cy(j*gh + offsetY)
    const g = new FourFlies(inner, gw, gh, 8)
    g.draw()
  }
}