float angle = 0;
void setup(){
  size(800, 600, P2D); 
  frameRate(10);
}

void draw(){
  angle += 0.1;
  background(0, 0);    
  translate(400, 300);
 
  for(int i = 0; i < 1000; i++){

    rotate(random(0, 2 * PI));
  strokeWeight(10);
    
    switch(i){
      case 100:
          stroke(255, 0, 255);
          line(0, 0, random(200), random(300));
          line(0, 0, random(200), random(300));
          break;
      
      case 200:
          stroke(255, 0, 0);
          line(0, 0, random(100), random(300));
          line(0, 0, random(100), random(300));
          break;
      
      case 300:
          stroke(255, 255, 0);
          line(0, 0, random(100), random(400));
          line(0, 0, random(100), random(400));
          break;
      
      case 400:
          stroke(0, 255, 255);
          line(0, 0, random(100), random(400));
          line(0, 0, random(100), random(400));
          break;
    }
  }
  

}
