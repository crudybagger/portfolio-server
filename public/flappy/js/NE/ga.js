function resetGame() {
    counter = 0;
    pipes = [];
  }
  
  // Create the next generation
  function nextGeneration() {
    resetGame();
    generation++;
    console.log(generation)
    // Normalize the fitness values 0-1
    normalizeFitness(allBirds);
    // Generate a new set of birds
    activeBirds = generate(allBirds);
    // Copy those birds to another array
    allBirds = activeBirds.slice();
  }
  
  // Generate a new population of birds
  function generate(oldBirds) {
    var newBirds = [];
  
    for (var i = 0; i < oldBirds.length; i++) {
      // Select a bird based on fitness
      var bird = poolSelection(oldBirds);
      newBirds[i] = bird;
    }
    return newBirds;
  }
  
  
  // Normalize the fitness of all birds
  function normalizeFitness(birds) {
    // make score exponentially better?
    // Make score exponentially better?
    for (var i = 0; i < birds.length; i++) {
      birds[i].score = pow(birds[i].score, 2);
    }
  
    // Add up all the scores
    var sum = 0;
    for (var i = 0; i < birds.length; i++) {
      sum += birds[i].score;
    }
    var check = 0;
    // Divide by the sum
    for (var i = 0; i < birds.length; i++) {
      birds[i].fitness = birds[i].score / sum;
      //console.log(birds[i].fitness);
      check += birds[i].fitness;
    }
  }
  
  
  
  // An algorithm for picking one bird from an array
  // based on fitness
  function poolSelection(birds) {
    // Start at 0
    var index = 0;

     // Pick a random number between 0 and 1
    var r = random(1);
    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
      r -= birds[index].fitness;
     // And move on to the next
      index += 1;
    }

    // Go back one
    index -= 1;
  
    // Make sure it's a copy!
    // (this includes mutation)
    //console.log(index);
    return birds[index].copy();
  }