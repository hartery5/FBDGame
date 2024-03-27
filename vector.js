class vector{
  constructor(x,y, len,theta,name){
    this.r = createVector(x, y);
    this.v = createVector(len*cos(theta),len*sin(theta));
    this.vmag = this.v.mag();
    this.theta = theta;
    this.active = false;
    this.done = false;
    this.name = name;
  }
  
  update(x,y){
    this.v.x = x - this.r.x;
    this.v.y = y - this.r.y;
    this.vmag = this.v.mag();
    this.theta = this.v.heading();
  }
  
  show(){
    push();
    translate(this.r.x,this.r.y);

    noStroke();
    let nr = this.vmag;
    let nx = nr*cos(this.theta+0.5);
    let ny = nr*sin(this.theta+0.5);
    if (typeof this.name === 'string' && this.name.length>0){
      text(this.name.substring(0,1),nx,ny);
      textSize(12)
      text(this.name.substring(1),nx+5,ny);
      textSize(16);
      stroke(0);
      strokeWeight(1);
      let py = ny - textAscent();
      line(nx+1,py,nx+7,py);
      line(nx+4,py-2,nx+7,py);
    }
    rotate(this.theta);
    if (this.active){
      fill(200,0,0);
      stroke(200,0,0);
    } else {
      fill(0);
      stroke(0);
    }
    strokeWeight(3);
    line(0,0,this.vmag-8,0);
    translate(this.vmag-8,0);
    triangle(0,5,8,0,0,-5);
    pop();
  }
  
}

function keyPressed(){
  if (keyCode == ENTER){
    name.hide();
  }
}