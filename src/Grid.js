import { random } from './helpers';

export default class Grid{
  constructor(ctx, width, height){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  draw(){
    const canvas = this.ctx;
    const width = this.width;
    const height = this.height;

    const grid = {
      x: 8,
      y: 18,
    }

    let gutter = 0;
    const margin = 20;

    const size = {
      x: (width - margin*2)/grid.x,
      y: (width - margin*2)/grid.x,
    }

    console.log(size)
    let gutterX = gutter
    let gutterY = gutter
    let offsetY = 0
    let offsetX = 0

    for(let j = 0; j < grid.y; j++){
      for(let i = 0; i < grid.x; i++){
        const noise = 1 - Math.cos(j/grid.y * Math.PI/2)
        const offsetMag = noise * size.x*2

        offsetY = random(-offsetMag/2, offsetMag/2)
        offsetX = random(-offsetMag/2, offsetMag/2)

        const rotMag = noise * 180;
        canvas
          .rect(size.x - gutter, size.y - gutter)
          .x(i*size.x + margin + offsetX)
          .y(j*size.y + margin + offsetY)
          .rotate(random(-rotMag/2, rotMag/2))
          .attr({
            fill: 'none',
            stroke: 'black'
          })
      }
    }
  }
}