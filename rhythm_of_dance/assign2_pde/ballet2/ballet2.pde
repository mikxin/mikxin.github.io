
float angle90 = 0;
float angle180 = 0;
int r = 255;
int g = 111;
int b = 153;

void setup(){
  //noLoop();
  size(900, 150, P2D);
  frameRate(30);    
}

void draw(){
  background(0, 0);
  r+=random(0, 10);
  b+=random(0, 10);
  g+=random(0, 10);
  if(r >= 255) r = 0;
  if(g >= 255) g = 0;
  if(b >= 255) b = 0;
  
  //text("arabesque", 400, 100);
  int j = 120;
  int k = 0;
  for(int i = 0; i < 8; i++, j+=110){
    pushMatrix();
    if(i % 2 == 0){
      translate(j, 0);
    }
    else{
      translate(k + 10, 0);
    }
   
    if(i % 2 == 0){
         rot90();
    }
    
    else if(mousePressed){
        rot180();
      }
    stroke(0);
    strokeWeight(5);
    line(0, 0, 0, 90); //leg
    fill(r, g, b);
    noStroke();
    ellipse(0, 100, 10, 20); //shoes
    popMatrix();
    k = j; //store previous j
  }
}

//for normal arabesque
void rot90(){
   angle90+= 0.005;
   if(angle90 > PI/2)
      angle90 = 0;
   rotate(angle90);    
}

//for grand jete
void rot180(){
  rotate (-angle90);
}
