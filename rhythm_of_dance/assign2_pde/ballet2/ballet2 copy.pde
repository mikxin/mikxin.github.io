float base = 35;
float theight = 180;
float[] baseCent;
float angle90 = 0;
float angle180 = 0;
PFont myFont;

void setup(){
  //noLoop();
  size(1000, 200, P2D);
  frameRate(10);
  baseCent = new float[4];
  baseCent[0] = width/4 + base/2;
  baseCent[1] = baseCent[0] + base;
  baseCent[2] = 3 * width/4 + base/2;
  baseCent[3] = baseCent[2] + base;
  
  myFont = createFont("FFScala", 30);
  textFont(myFont);
   
}

void draw(){
  background(0);
  //text("arabesque", 400, 100);
  for(int i = 0; i < 4; i++){
    pushMatrix();
    translate(baseCent[i], 0);
    if(i % 2 == 0){
         rot90();
    }
    
    else if(mousePressed){
        rot180();
      }
    triangle( -base/2, 0, base/2, 0, 0, theight);
    stroke(249, 191, 220);
    drawTutu(0,0);
    popMatrix();
  }
}

//for normal arabesque
void rot90(){
   angle90+= 0.05;
   if(angle90 > PI/2)
      angle90 = 0;
   rotate(angle90);    
}

//for grand jete
void rot180(){
  rotate (-angle90);
//  angle180 -= 0.009;   
//  if(angle180 < -PI/2)
//      angle180 = 0;
//   rotate(angle180);
}

//borrow from ballet1
void drawTutu(float cenX, float cenY){
  pushMatrix();
  translate(cenX, cenY);
  //longer lines
  for(int i = 0; i < 800; i++){
    rotate(random(PI));
    line(0, 0, random(30, 70), 0);
  }
  //shorter lines
  for(int i = 0; i < 800; i++){
    rotate(random(PI));
    line(0, 0, random(30), 0);
  }
  popMatrix();
}
