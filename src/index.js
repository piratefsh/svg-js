import SVG from 'svg.js';
import './styles/index.scss';
import DrawingContext from './DrawingContext';
import Koch from './Koch';

const WIDTH = 300;
const HEIGHT = 300;
const s = SVG('my-drawing').size(WIDTH, HEIGHT);
const CX = WIDTH/2;
const CY = HEIGHT/2;
const state = []


function plotPoints(ctx, points){
  ctx
    .cx(CX)
    .cy(CY)
  points
    .forEach(p => {
      ctx.ellipse(3, 3)
      .cx(p.x)
      .cy(p.y)
  })

  return;
}

s.rect(90, 90)
  .cx(150)
  .cy(150)
  .attr({
    stroke: '#f00',
    fill: 'none'
    })

const ctx = new DrawingContext();
const k = new Koch(ctx);

plotPoints(s.nested(), k.points())