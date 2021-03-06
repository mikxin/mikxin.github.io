//modified from tutorial from Proccessing.org
int ex = 20;
int ey = 20;

int xspacing = 10;   // How far apart should each horizontal location be spaced
int w;              // Width of entire wave

float theta = 0.0;  // Start angle at 0
float amplitude = 75.0;  // Height of wave
float period = 300.0;  // How many pixels before the wave repeats
float dx;  // Value for incrementing X, a function of period and xspacing
float[] yvalues;  // Using an array to store height values for the wave
float[] yvalues2; // for half period slower wave

void setup() {
  size(900, 640, P2D);
  //frameRate(40);
  w = height+10;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new float[w/xspacing];
  yvalues2 = new float[w/xspacing];
}

void draw() {
  background(0, 0);
  calcWave();
  renderWave();
}

void calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.06;

  // For every x value, calculate a y value with sine function
  float x = theta;
  for (int i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
  
  //transfer suitable 'offset' values to second array
  int t = yvalues.length/4 - 1;
  for (int i = 0; i < yvalues.length; i++, t++){
    if(t >= yvalues.length){
      t = yvalues.length - 30 ; 
    }
     yvalues2[i] = yvalues[i];
  }

}

void renderWave() {
  noStroke();
  fill(255);
  float dis = amplitude + 14;
  // A simple way to draw the wave with an ellipse at each location
  for (int x = 0; x < yvalues.length; x++) {
    if(x % 2 == 0)
      fill(240, 175, 229);
    else
      fill(239, 28, 98);  
    ellipse(yvalues[x] + dis, x*xspacing, ex, ey);
    ellipse(yvalues2[x] + dis * 9, x*xspacing, ex, ey);
    //ellipse(yvalues2[x] + mouseX, x*xspacing, 20, 20);
    
  }
  for (int x = 0; x < yvalues.length; x++) {
    if(x % 2 == 0)
      fill(255, 204, 0);
    else
      fill(255, 255, 0);  
    ellipse(yvalues[x] + dis * 8, x*xspacing, ex, ey); 
    ellipse(yvalues2[x] + dis * 2, x*xspacing, ex, ey);
  }
  
  
}

