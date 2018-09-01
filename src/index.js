import SVG from 'svg.js';
import './styles/index.scss';
import Grid from './Grid';

const width = 400*0.8;
const height = 800*0.8;

const canvas = SVG('my-drawing')
  .size(width, height);

const g = new Grid(canvas, width, height)

g.draw()