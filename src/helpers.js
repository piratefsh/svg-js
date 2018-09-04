const debug = false;
function random(start, end) {
    return Math.random() * (end - start) + start;
}

function radians(deg){
  return deg/180*Math.PI
}

const debugAttr = {
    fill: "none",
    stroke: debug ? "orangered" : "none"
};
export { random, radians, debugAttr };
