var button;
var slider;


function setup() {
  createCanvas(100, 1000);
  background(0);
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(changeBG);

  slider = createSlider(0, 255, 100);
  slider.position(19, 50);
  slider.style('width', '80px');
}


function changeBG() {
  var val = random(255);
  background(val);
  var val = slider.value();
  background(val);
}

