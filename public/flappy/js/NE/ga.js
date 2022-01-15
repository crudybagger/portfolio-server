function resetGame() {
  counter = 0;
  pipes = [];
}

// Create the next generation
function nextGeneration() {
  resetGame();
  generation++;
  console.log(generation);
  normalizeFitness(allBirds);
  activeBirds = generate(allBirds);
  allBirds = activeBirds.slice();
}

function generate(oldBirds) {
  var newBirds = [];

  for (var i = 0; i < oldBirds.length; i++) {
    var bird = poolSelection(oldBirds);
    newBirds[i] = bird;
  }
  return newBirds;
}

function normalizeFitness(birds) {
  for (var i = 0; i < birds.length; i++) {
    birds[i].score = pow(birds[i].score, 2);
  }

  var sum = 0;
  for (var i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  var check = 0;
  for (var i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
    //console.log(birds[i].fitness);
    check += birds[i].fitness;
  }
}

// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(birds) {
  var index = 0;

  var r = random(1);
  while (r > 0) {
    r -= birds[index].fitness;
    index += 1;
  }

  index -= 1;

  return birds[index].copy();
}
