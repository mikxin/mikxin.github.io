float angle = 0;
int i = 0;
boolean j = false;
void setup(){
   size(600, 600, P2D);
   noFill();
  // noLoop();
}

void draw(){
  angle+= 0.5;
  background(0, 0);
  //int i = 0;
  if(overCircle(300, 300, 400)){
    //angle--;
    
    if(i >= 300){
      j = true;
    }
    else if(i <= -100){
      j = false;
    }
    if(j)
      i -= 15;
    else{
      i+=15;
    }
    
    //rotate(random(5, 10), random(5, 10));
  }
  hoop(300 + i, 100 + i, 159, 111, 255);  
  hoop(500 - i, 300 + i, 250, 152, 53);
  hoop(300 - i, 500 - i, 250, 53, 86);
  hoop(100 + i, 300 - i, 59, 162, 0);
  
}

void hoop(int dx, int dy, int r, int g, int b){
  pushMatrix();
  translate(dx, dy);

  rotate(angle);
  strokeWeight(6);
  stroke(255, 223, 11);
  arc(0, 0, 100, 100, PI/2, 3*PI/2);
  stroke(r, g, b);
  arc(0, 0, 100, 100, -PI/2, PI/2);  

  popMatrix();  
}

boolean overCircle(int x, int y, int diameter) {
  float disX = x - mouseX;
  float disY = y - mouseY;
  if(sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

