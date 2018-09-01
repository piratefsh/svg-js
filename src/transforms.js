import math from 'mathjs';

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

export {
  translate,
  rotate
}