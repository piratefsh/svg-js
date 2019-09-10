function run(prob){
  const [n, p] = prob;
  return Math.random() <= (p/n);
}

function transliterate(canvas, idx, freq, lookup){
  const px = canvas[idx];
  if(run([freq, 1]) && px in lookup){
    // replace px with new one
    canvas[idx] = lookup[px]
  }
}

function xl(canvas, prob, freq, lookup){
  if(run(prob)){
    canvas.forEach((px, idx) => {
      transliterate(canvas, idx, freq, lookup)
    })
  }
}

/**
  AXL (n,p)nums,dirs,chst,q(xlit)goto
    e.g.
    AXL (1,1)234,RNESW,ABCD,5(XXXXXXXXXX)

  ...is a similar probabilistic transliteration but it
  applies only to those characters made eligible by adjacent
  characters: if certain numbers of neighbors in specified
  directions are among the given character set, then,
  with probability 1/q the transliteration is applied.
  In the example, if exactly 2 or 3 or 4 of the neighbors
  to the right, north, east, south or west are A's or B's
  or C's or D's, then about one-fifth of the digits 0-9
  thus situated are changed to X's.
  **/
function axl(canvas, prob, nums, dirs, target, freq, lookup){
  if(run(prob)){
    canvas.forEach((px, idx) => {
      if(numNeibs(canvas, idx, dirs, target) in nums){
        transliterate(canvas, idx, freq, lookup);
      }
    })
  }
}

function idxToCoord(width, height, idx){
  return [idx % width, Math.floor(idx/width)];
}

function coordToIdx(width, height, coord){
  const [x, y] = coord;
  return y * width + x
}

/**
directions:

    W A N
     \|/
   L - - R
     /|\
    S B E

**/
function numNeibs(canvas, idx, dirs, target){
  const { width, height } = canvas;
  const [x, y] = idxToCoord(width, height, idx);
  const px = canvas[idx];

  const pos = (x, y) => coordToIdx(width, height, [x, y])

  return dirs.reduce((acc, d) => {
    if(d === 'A'){
      return acc + (canvas[pos(x, y - 1)] in target) ? 1 : 0
    } else if (d === 'N') {
      return acc + (canvas[pos(x + 1, y - 1)] in target) ? 1 : 0
    } else if (d === 'R') {
      return acc + (canvas[pos(x + 1, y)] in target) ? 1 : 0
    } else if (d === 'E') {
      return acc + (canvas[pos(x + 1, y + 1)] in target) ? 1 : 0
    } else if (d === 'B') {
      return acc + (canvas[pos(x, y + 1)] in target) ? 1 : 0
    } else if (d === 'S') {
      return acc + (canvas[pos(x - 1, y + 1)] in target) ? 1 : 0
    } else if (d === 'L') {
      return acc + (canvas[pos(x - 1, y)] in target) ? 1 : 0
    } else if (d === 'W') {
      return acc + (canvas[pos(x - 1, y - 1)] in target) ? 1 : 0
    }
  }, 0)
}
export {
  xl,
  axl,
  transliterate,
  numNeibs,
  idxToCoord,
  coordToIdx,
}