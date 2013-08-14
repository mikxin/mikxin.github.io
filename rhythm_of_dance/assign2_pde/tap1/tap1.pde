
int display = 0;

void setup(){
  size(800, 600, P2D);
  frameRate(5);
}

void draw(){
  if(display >= 100)
    display = 0;
  display++;
  //display = !display;
  //noStroke();
  float angle = 0;
  background(0, 0);
  translate(400, 300);
  for(int i = 0; i < 30; i++){

    fill(255);
    rotate(2 * PI /30);
    
    if(i % 2 == 0 && display % 5 == 0){
      fill(255, 0, 0);

    }
    else if(i % 2 != 0 && display % 5 != 0){
      fill(100, 0, 255);
    }
 
    ellipse(100, 100, 20, 20);
    ellipse(200, 200, 20, 20);

  }
}

