function run(prob){
  const [n, p] = prob;
  return n * Math.random() <= p;
}

function transliterate(canvas, idx, freq, lookup){
  const px = canvas[idx];
  const currIdx = lookup.indexOf(px);

  if(run([freq, 1]) && currIdx > -1){
    // replace px with new one
    if (currIdx + 1 < lookup.length){
        canvas[idx] = lookup.charAt(currIdx + 1)
    }
  }
}

function xl(canvas, prob, freq, lookup){
  if(run(prob)){
    for(let i = 0; i < canvas.length; i++){
      transliterate(canvas, i, freq, lookup)
    }
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
    for(let i = 0; i < canvas.length; i++){
      if(numNeibs(canvas, i, dirs, target) in nums){
        transliterate(canvas, i, freq, lookup);
      }
    }
  }
}

/**
  WBT  (n,p)(whites,blacks,twinkles)goto
  e.g.
  WBT  (1,1)(01234,56789,ABCXYZ)

  specifies which characters are output as white, which as black and
  which ones twinkle (i.e. are independently chosen spot-by-spot,
  frame-by-frame, to be black or white with 50/50 probability.)
  In the example, 0 to 4 are white, 5 to 9 black and letters
  A, B, C, X, Y, and Z twinkle; other letters retain their
  previous significance.

  Printed output - i.e. from TST mode - is unaffected by WBT:
  here zeros come out as blanks and all other characters appear
  as themselves.
**/
function wbt(){

}

function idxToCoord(width, height, idx){
  return [idx % width, Math.floor(idx/width)];
}

function coordToIdx(width, height, coord){
  const [x, y] = coord;
  return y * width + x
}

function normalizeCoords(coords, width, height){
  const [ x, y ] = coords;
  let nx = x;
  let ny = y;
  if ( x < 0 ){
    nx = width - 1
  } else if (x > width - 1) {
    nx = 0
  }

  if ( y < 0 ){
    ny = height - 1
  } else if (y > height - 1) {
    ny = 0
  }

  return [nx, ny]
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

  const pos = ([x, y]) => coordToIdx(width, height, [x, y])

  let acc = 0;
  for(let i = 0; i < dirs.length; i++){
    const neibCoord = getNeibPos(dirs[i], [x, y])

    if(!neibCoord) {
      continue
    }
    const neib = pos(normalizeCoords(neibCoord, width, height));

    acc += (target.indexOf(canvas[neib]) > -1 ? 1 : 0 )
  }

  return acc;
}

function getNeibPos(d, coord){
  const [x, y] = coord;
  let nx, ny;
  if(d === 'A'){
      nx = x;
      ny = y - 1;
    } else if (d === 'N') {
      nx = x + 1;
      ny = y - 1;
    } else if (d === 'R') {
      nx = x + 1;
      ny = y;
    } else if (d === 'E') {
      nx = x + 1;
      ny = y + 1;
    } else if (d === 'B') {
      nx = x;
      ny = y + 1;
    } else if (d === 'S') {
      nx = x - 1;
      ny = y + 1;
    } else if (d === 'L') {
      nx = x - 1;
      ny = y;
    } else if (d === 'W') {
      nx = x - 1;
      ny = y - 1;
    } else {
      return false
    }
    return [nx, ny]
}

export {
  xl,
  axl,
  transliterate,
  numNeibs,
  idxToCoord,
  coordToIdx,
  normalizeCoords
}
