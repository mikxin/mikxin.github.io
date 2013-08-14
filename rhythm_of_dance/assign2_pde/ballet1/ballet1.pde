int rad = 200; //radius of the big circle
float angle = 0; //for rotating around center axis

void setup(){
  size(600, 600, P2D);
  //noLoop();
  frameRate(10);
  smooth();
}

void draw(){
  background(255);

  //create 6 tutus in a circle
  translate(width/2, height/2);
  rotate(PI/2);
  if(overCircle(width/2, height/2, rad * 2)){
    angle += (PI/10);
    rotate(angle % (2 * PI));
  }
  
  for(int i = 0; i < 5; i++){
    rotate(PI/3 + PI/15); //72 deg
    switch(i){
      case 0:
        stroke(249, 191, 220);
        break;
      case 1:
        stroke(255, 195, 233);
        break;
      case 2:  
        stroke(255, 112, 203);
        break; 
      case 3:
        stroke(235, 195, 255); 
        break;
      case 4:  
        stroke(218, 112, 255);  
        break;  
    }
    
    drawTutu(rad, 0);
  }
 
}

void drawTutu(float cenX, float cenY){
  pushMatrix();
  translate(cenX, cenY);
  //longer lines
  for(int i = 0; i < 800; i++){
    rotate(random(PI));
    line(0, 0, random(40, 85), 0);
  }
  //shorter lines
  for(int i = 0; i < 800; i++){
    rotate(random(PI));
    line(0, 0, random(40), 0);
  }
  //supposedly the head
  fill(101, 67, 8);
  ellipse(random(0, 3), random(0, 3), 20, 20);
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
