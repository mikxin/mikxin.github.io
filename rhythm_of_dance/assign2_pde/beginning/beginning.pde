void setup(){
  size(600, 200, P2D);
}

void draw(){
  background(0, 0);
  translate(random(5), random(5));
  PImage img;
  img = loadImage("title.png");
  image(img, 0, 0);
}
