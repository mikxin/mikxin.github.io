

int eNum = 7;
float[] eSize = new float[eNum];
boolean[] maxSize = new boolean[eNum];

float angle = 0;
float angle2 = 0;
int display = 0;

void setup(){
  size(800, 600, P2D);
 
}

void draw(){
  //frameRate(20);
  background(0, 0);
  angle+= 0.5;
  //ballet
  strokeWeight(1);
  stroke(249, 191, 220);
  
  drawTutu(400, 300);
  noFill();
  //hiphop
 for(int i = 0; i < eNum; i++){
    stroke(random(0, 255), random(0, 255), random(0, 255));
    strokeWeight(random(2, 8));
    if(eSize[i] >= random(100, 200))
      maxSize[i] = true;
    if(eSize[i] <= 0)
      maxSize[i] = false;
    if(maxSize[i]){
      eSize[i] -= random(2, 10);
    }
    else
      eSize[i] += random(5, 25);
    ellipse(100 * i + 100, 300, eSize[i], eSize[i]);
  }
    
   //RG
   
   hoop(400, 300, 159, 111, 255);  
   
   //tap
    //frameRate(5);
   if(display >= 100)
    display = 0;
  display++;
  
  strokeWeight(1);
  float angle2 = 0;
  translate(400, 300);
  for(int i = 0; i < 30; i++){

    noFill();
    rotate(2 * PI /30);
    
    if(i % 2 == 0 && display % 5 == 0){
      fill(255, 0, 0);

    }
    else if(i % 2 != 0 && display % 5 != 0){
      fill(100, 0, 255);
    }
 
    ellipse(200, 200, 20, 20);
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

void hoop(int dx, int dy, int r, int g, int b){
  pushMatrix();
  translate(dx, dy);

  rotate(angle);
  strokeWeight(6);
   stroke(255, 223, 11);
  arc(0, 0, 300, 300, PI/2, 3*PI/2);
  stroke(r, g, b);
  arc(0, 0, 300, 300, -PI/2, PI/2);  

  popMatrix();  
}

