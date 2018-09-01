import SVG from 'svg.js';
import math from 'mathjs';
import './styles/index.scss';
const WIDTH = 300;
const HEIGHT = 300;
const s = SVG('my-drawing').size(WIDTH, HEIGHT);
const CX = WIDTH/2;
const CY = HEIGHT/2;

const ellipse = s
  .rect(90, 90)
  .cx(150)
  .cy(150)
  .attr({
    stroke: '#f00',
    fill: 'none'
    })

const curveAttr = {
  'stroke': '#f00',
  'fill': 'none',
  'stroke-width': 5
  }

const translate = (point, x, y) => ({x: point.x + x, y: point.y + y})
const rotate = (point, origin={x:0, y:0}, deg) => {
  const theta = math.unit(deg, 'deg');
  const rotMatrix = [
    [math.cos(theta), -math.sin(theta)],
    [math.sin(theta), math.cos(theta)]
  ]

  const res = math.multiply(rotMatrix, [point.x-origin.x, point.y-origin.y]);
  return {x: res[0]+origin.x, y: res[1]+origin.y}
}
// returns list of points on this curve
//
function kochCurvePoints(len){
  const l = (len)/3
  const c1 = {x: 0, y: 0}
  const c2 = translate(c1, l, 0)
  const c3 = rotate(translate(c2, l, 0), c2, 60);
  const c4 = rotate(translate(c3, l, 0), c3, -60);
  const c5 = rotate(translate(c4, l, 0), c4, 0);
  return [c1, c2, c3, c4, c5]
}


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

plotPoints(s.nested(), kochCurvePoints(100))