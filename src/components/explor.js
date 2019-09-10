function run(prob){
  const [n, p] = prob;
  return Math.random() <= (p/n);
}

function xl(canvas, prob, freq, lookup){
  if(run(prob)){
    canvas.forEach((px, i) => {
      if(run([freq, 1]) && px in lookup){
        // replace px with new one
        canvas[i] = lookup[px]
      }
    })
  }

  return canvas;
}

function axl(){

}

export {
  xl,
  axl
}