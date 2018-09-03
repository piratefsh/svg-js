import SVG from 'svg.js';
import './styles/index.scss';
import FourFlies from './FourFlies';

const width = 200
const height = 200

const canvas = SVG('my-drawing')
  .size(width, height);

const grid = {
  x: 1,
  y: 1
}
const gw = width/grid.x
const gh = height/grid.y

for(let i = 0; i < grid.x; i++){
  for(let j = 0; j < grid.y; j++){
    const inner = canvas.nested(gw, gh)
    inner
      .cx(i*gw + gw/2)
      .cy(j*gh + gh/2)
    const g = new FourFlies(inner, gw, gh)
    g.draw()
  }
}