
function grid2d(width, height, gx, gy, fn){
  const cx = width/gx;
  const cy = height/gy;
    for (let j = 0; j < gy; j++) {
  for (let i = 0; i < gx; i++) {
      fn(i * cx, j * cy, cx, cy, i, j);
    }
  }
}

export { grid2d }