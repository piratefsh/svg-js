export default class Koch {
  constructor(ctx){
    this.ctx = ctx;
    this.length = 80;
  }

  points(){

    // return this.edge([], this.length, 1)
    const points = [];
    this.ctx.translate(50, 0);
    points.push(this.ctx.origin());
    this.ctx.translate(50, 0);
    this.ctx.rotate(90);
    points.push(this.ctx.origin());
    this.ctx.rotate(90);
    // points.push(this.ctx.origin());
    this.ctx.rotate(90);
    // points.push(this.ctx.origin());
    // this.ctx.translate(50, 0);
    console.log(this.ctx)
    // return this.edge([{
    //   x: 0, y: 0
    // }], this.length, 1);
    return points;


  }

  edge(points=[], length, depth){
    const nextLen = length/3;

    if (depth == 0){
      //draw line
      const o = this.ctx.origin();
      points.push({x: o.x + length, y: o.y});
      this.ctx.translate(length, 0);

    } else {
      this.edge(points, nextLen, depth - 1);

      this.ctx.rotate(-60);
      this.edge(points, nextLen, depth - 1);

      this.ctx.rotate(120);
      this.edge(points, nextLen, depth - 1);

      this.ctx.rotate(-60);
      this.edge(points, nextLen, depth - 1);
    }

    return points
  }
}
