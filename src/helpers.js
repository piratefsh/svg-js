
const debug = false
function random(start, end){
  return Math.random() * (end-start) + start;
}

const debugAttr = {
  fill: 'none',
  stroke: debug ? 'orangered' : 'none'}
export { random, debugAttr }