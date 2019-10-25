function grid2d(width, height, gx, gy, fn) {
    const cx = width / gx;
    const cy = height / gy;
    for (let i = 0; i < gx; i++) {
        for (let j = 0; j < gy; j++) {
            fn(i * cx, j * cy, cx, cy, i, j);
        }
    }
}

export { grid2d };
