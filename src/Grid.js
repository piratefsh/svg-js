
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
      y: 16,
    }

    let gutter = 6;
    const margin = 12;

    const size = {
      x: (width - margin*2)/grid.x,
      y: (height - margin*2)/grid.y,
    }

    for(let i = 0; i < grid.x; i++){
      for(let j = 0; j < grid.y; j++){
        const rotMag = (1 - Math.cos(j/grid.y * Math.PI/2)) * 360;
        canvas
          .rect(size.x - gutter, size.y - gutter)
          .x(i*size.x + margin)
          .y(j*size.y + margin)
          .rotate(-rotMag/2 + (rotMag/2 * Math.random()))
          .attr({
            fill: 'none',
            stroke: 'black'
          })
      }
    }
  }
}