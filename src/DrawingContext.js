import { translate, rotate } from './transforms';


export default class DrawingContext{
  constructor(){
    this.o = {x: 0, y: 0};
    this.rotation=0;
    this.translation= Object.assign(this.o);
  }

  origin(){
    return Object.assign({}, this.o);
  }

  translate(x, y){
    this.o = translate(this.o, x, y);
  }

  rotate(deg){
    this.rotation += deg;
    this.o = rotate(this.o, this.o, this.rotation);
  }

}