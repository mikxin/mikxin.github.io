
float angle90 = 0;
float angle180 = 0;
int r = 255;
int g = 111;
int b = 153;
int ben = 0;

void setup(){
  //noLoop();
  size(900, 150, P2D);
  frameRate(10);    
}

void draw(){
  
  if(ben >= 100) ben = 0;
  ben++;
  background(0, 0);
  r+=random(0, 10);
  b+=random(0, 10);
  g+=random(0, 10);
  if(r >= 255) r = 0;
  if(g >= 255) g = 0;
  if(b >= 255) b = 0;
  

  int j = 110;
  int k = 0;
  for(int i = 0; i < 8; i++, j+=110){
    pushMatrix();
    stroke(255);
    strokeWeight(5);
    
     if(mousePressed){
        translate(random(10), random(30));
      }
    
    
    if(i % 2 == 0){
      translate(j, 0);
      bend();
    }
    else{
      translate(k + 10, 0);
      if(ben % 5 != 0){
        line(0, 0, 0, 90);
         fill(r, g, b);
         noStroke();
         ellipse(0, 90, 10, 20); //shoes
      }
      else{
         line(0, 0, 0, 90);
         fill(r, g, b);
         noStroke();
         ellipse(0, 100, 10, 20); //shoes
      }
    }
    
    popMatrix();
    k = j; //store previous j
  }
}

//for bending legs
void bend(){
   if(ben % 5 != 0){
        line(0, 0, 0, 90);
         fill(r, g, b);
          noStroke();
          ellipse(0, 100, 10, 20); //shoes
      }
      else{
        line(0, 0, -50, 35);
        pushMatrix(); 
          translate(-50, 35);     
          line(0, 0, 50, 35);
        popMatrix();
        fill(r, g, b);
        noStroke();
        ellipse(0, 70, 10, 20); //shoes
      }    
}

