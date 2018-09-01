import SVG from 'svg.js';
import './styles/index.scss';

const s = SVG('my-drawing').size(300, 300);
const ellipse = s
  .ellipse(90, 90)
  .cx(150)
  .cy(150)
  .attr({
    stroke: '#f00',
    fill: 'none'
    })


function kochCurve(){

}