import math from 'mathjs';

const translate = (point, x, y) => ({x: point.x + x, y: point.y + y})

const rotate = (point, deg) => {
  const theta = math.unit(deg, 'deg');
  const rotMatrix = [
    [math.cos(theta), -math.sin(theta)],
    [math.sin(theta), math.cos(theta)]
  ]

  const res = math.multiply(rotMatrix, [point.x, point.y]);
  return {x: res[0], y: res[1]}
}

export {
  translate,
  rotate
}