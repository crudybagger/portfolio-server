var totalPopulation = 500;
let generation = 0;
var activeBirds = [];
var allBirds = [];
// Pipes
var pipes = [];
var counter = 0;

var speedSlider;

function setup() {
  var canvas = createCanvas(800, 400);
  speedSlider = createSlider(1, 100, 50);
  createDiv("<p style = 'size : 100px'>Select Speed of the Game from here<p/>");
  for (var i = 0; i < totalPopulation; i++) {
    var bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
}

function draw() {
  background(30, 30, 200);

  var cycles = speedSlider.value();
  for (var n = 0; n < cycles; n++) {
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    for (var i = activeBirds.length - 1; i >= 0; i--) {
      var bird = activeBirds[i];
      // Bird uses its brain!
      bird.think(pipes);
      bird.update();
      for (var j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(activeBirds[i])) {
          activeBirds.splice(i, 1);
          break;
        }
      }
    }

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }
  for (var i = 0; i < activeBirds.length; i++) {
    activeBirds[i].show();
  }
  if (activeBirds.length == 0) {
    nextGeneration();
  }
}
