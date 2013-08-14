int eNum = 7;
float[] eSize = new float[eNum];
boolean[] maxSize = new boolean[eNum];

void setup(){
  size(800, 200, P2D);
  //initialize
  for(int i = 0; i < eNum; i++){
    eSize[i] = 0;
    maxSize[i] = false;
  }
}

void draw(){
  background(0, 0);
  noFill();
  
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
    ellipse(100 * i + 100, 100, eSize[i], eSize[i]);
  }
}


