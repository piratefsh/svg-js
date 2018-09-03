// reference: http://blog.as.uky.edu/sta695/wp-content/uploads/2013/01/four-bugs.pdf

/*
  Problem description:
    Four flies sit at the corners of a card table,
    facing inward. They start simultaneously
    walking at the same rate, each directing its
    motion steadily toward the fly on its right.
    Find the path of each.
  My implementation:
    I drew the lines between each bug as they moved
    rather than the path they walked.
*/
export default class FourFlies {
  constructor(canvas, width, height, stepSize=10, numBugs=4, rotOffset=0){
    this.ctx = canvas;
    this.bugs = [];
    this.rotOffset = rotOffset;

    const rotStep = Math.PI*2/numBugs
    const rad = Math.sqrt(width * width + height*height)/2;
    for(let i = 0; i < numBugs; i++){
      this.bugs.push(makeBug(rad*Math.sin(rotStep*i + rotOffset), rad*Math.cos(rotStep*i + rotOffset)));
    }

    this.paths = this.bugs.map((b) => [])
    this.velocity = {x: stepSize, y: stepSize};
    this.minDist = this.velocity.x;

  }

  bugDistances(){
    const { bugs } = this;
    return Math.max.apply(null, bugs.map((b, i) =>
      dist(b.x, b.y,
        bugs[(i + 1) % bugs.length].x,
        bugs[(i + 1) % bugs.length].y
      )))
  }

  draw(){
    while (this.bugDistances() > this.minDist + 1) {
      this.drawOneStep()
    }

    this.drawPaths()
  }

  drawPaths(){
    this.paths.forEach((path)=> {
      const segments = path.map((segment) => {
        const s = segment[0];
        const e = segment[1];
        debugger
        return `M ${s.x} ${s.y} L ${e.x} ${e.y}`;
      })
      // const s = path[0];

      segments.forEach(s => {
        this.ctx.path(s)
          .attr({
            fill: 'none',
            stroke: 'black',
            'stroke-weight': 1,
            'stroke-opacity': 1,
          })
      })
    })
  }

  drawOneStep(){
    const bugs = this.bugs;
    this.bugs = bugs.map((bug, i) => {
      const rightBugIndex = (i+1) % bugs.length;
      const rightBug = bugs[rightBugIndex];
      this.addPointToBugpath(i, bug, rightBug);
      // this.drawBug(bug);
      return moveBugTowards(bug, rightBug, this.velocity);
    });
  }

  drawBug(bug){
    this.ctx.ellipse(2, 2)
      .cx(bug.x)
      .cy(bug.y);
  }

  addPointToBugpath(i, p1, p2){
    this.paths[i].push([{x: p1.x, y: p1.y}, {x: p2.x, y: p2.y}]);
    // this.paths[i].push({x: p2.x, y: p2.y});
  }

  drawLineFromBugs(bug1, bug2){
    this.ctx.path(bug1.x, bug1.y, bug2.x, bug2.y);
  }
}

function makeBug(x, y){
  return { x: x, y: y};
}

function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function dist(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function moveBugTowards(bug, target, velocity){
  if(!target || !bug){ return; };
  // find distance between bug and target
  const d = dist(bug.x, bug.y, target.x, target.y);
  // find lerp value to step velocity distance
  const lerpVal = { x: velocity.x/d, y: velocity.y/d };

  return {
    x: lerp(bug.x, target.x, lerpVal.x),
    y: lerp(bug.y, target.y, lerpVal.y)
  }
}