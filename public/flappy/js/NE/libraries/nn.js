NeuralNetwork.sigmoid = function(x) {
    var y = 1 / (1 + Math.pow(Math.E, -x));
    return y;
  }
  
  // This is the Sigmoid derivative!
  NeuralNetwork.dSigmoid = function(x) {
    return x * (1 - x);
  }
  
  NeuralNetwork.tanh = function(x) {
    var y = Math.tanh(x);
    return y;
  }
  
  NeuralNetwork.dtanh = function(x) {
    var y = 1 / (pow(Math.cosh(x), 2));
    return y;
  }
  
  // This is how we adjust weights ever so slightly
  function mutate(x) {
    if (random(1) < 0.1) {
      var offset = randomGaussian() * 0.5;
      //var offset = random(-0.1, 0.1);
      var newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }
  
  // Neural Network constructor function
  function NeuralNetwork(inputnodes, hiddennodes, outputnodes, activation) {
  
    if (activation == 'tanh') {
      this.activation = NeuralNetwork.tanh;
      this.derivative = NeuralNetwork.dtanh;
    } else {
      this.activation = NeuralNetwork.sigmoid;
      this.derivative = NeuralNetwork.dSigmoid;
    }
  
  
    // If it's a copy of another NN
    if (arguments[0] instanceof NeuralNetwork) {
      var nn = arguments[0];
      this.inodes = nn.inodes;
      this.hnodes = nn.hnodes;
      this.onodes = nn.onodes;
      this.wih = nn.wih.copy();
      this.who = nn.who.copy();
      this.activation = nn.activation;
      this.derative = nn.derivative;
    } else {
      // Number of nodes in layer (input, hidden, output)
      // This network is limited to 3 layers
      this.inodes = inputnodes;
      this.hnodes = hiddennodes;
      this.onodes = outputnodes;
  
      // These are the weight matrices
      // wih: weights from input to hidden
      // who: weights from hidden to output
      // weights inside the arrays are w_i_j
      // where link is from node i to node j in the next layer
      // Matrix is rows X columns
      this.wih = new Matrix(this.hnodes, this.inodes);
      this.who = new Matrix(this.onodes, this.hnodes);
  
      // Start with random values
      this.wih.randomize();
      this.who.randomize();
    }
  
  }
  
  NeuralNetwork.prototype.copy = function() {
    return new NeuralNetwork(this);
  }
  
  NeuralNetwork.prototype.mutate = function() {
    this.wih = Matrix.map(this.wih, mutate);
    this.who = Matrix.map(this.who, mutate);
  }
  
  // Train the network with inputs and targets
  NeuralNetwork.prototype.train = function(inputs_array, targets_array) {
  
    // Turn input and target arrays into matrices
    var inputs = Matrix.fromArray(inputs_array);
    var targets = Matrix.fromArray(targets_array);
  
    // The input to the hidden layer is the weights (wih) multiplied by inputs
    var hidden_inputs = Matrix.dot(this.wih, inputs);
    // The outputs of the hidden layer pass through sigmoid activation function
    var hidden_outputs = Matrix.map(hidden_inputs, this.activation);
  
    // The input to the output layer is the weights (who) multiplied by hidden layer
    var output_inputs = Matrix.dot(this.who, hidden_outputs);
  
    // The output of the network passes through sigmoid activation function
    var outputs = Matrix.map(output_inputs, this.activation);
  
    // Error is TARGET - OUTPUT
    var output_errors = Matrix.subtract(targets, outputs);
  
    // Now we are starting back propogation!
  
    // Transpose hidden <-> output weights
    var whoT = this.who.transpose();
    // Hidden errors is output error multiplied by weights (who)
    var hidden_errors = Matrix.dot(whoT, output_errors)
  
    // Calculate the gradient, this is much nicer in python!
    var gradient_output = Matrix.map(outputs, this.derivative);
    // Weight by errors and learing rate
    gradient_output.multiply(output_errors);
    gradient_output.multiply(this.lr);
  
    // Gradients for next layer, more back propogation!
    var gradient_hidden = Matrix.map(hidden_outputs, this.derivative);
    // Weight by errors and learning rate
    gradient_hidden.multiply(hidden_errors);
    gradient_hidden.multiply(this.lr);
  
    // Change in weights from HIDDEN --> OUTPUT
    var hidden_outputs_T = hidden_outputs.transpose();
    var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
    this.who.add(deltaW_output);
  
    // Change in weights from INPUT --> HIDDEN
    var inputs_T = inputs.transpose();
    var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
    this.wih.add(deltaW_hidden);
  }
  
  
  // Query the network!
  NeuralNetwork.prototype.query = function(inputs_array) {
  
    // Turn input array into a matrix
    var inputs = Matrix.fromArray(inputs_array);
  
    // The input to the hidden layer is the weights (wih) multiplied by inputs
    var hidden_inputs = Matrix.dot(this.wih, inputs);
    // The outputs of the hidden layer pass through sigmoid activation function
    var hidden_outputs = Matrix.map(hidden_inputs, this.activation);
  
    // The input to the output layer is the weights (who) multiplied by hidden layer
    var output_inputs = Matrix.dot(this.who, hidden_outputs);
  
    // The output of the network passes through sigmoid activation function
    var outputs = Matrix.map(output_inputs, this.activation);
  
    // Return the result as an array
    return outputs.toArray();
  }


  // Make a matrix full of zeros
function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows);
    for (var i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(cols);
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }
  
  // This fills the matrix with random values (gaussian distribution)
  Matrix.prototype.randomize = function() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        //this.matrix[i][j] = randomGaussian();
        this.matrix[i][j] = Math.random(-1, 1);
      }
    }
  }
  
  // Take the matrix and make it a 1 dimensional array
  Matrix.prototype.toArray = function() {
    // Add all the values to the array
    var arr = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }
  
  
  // This transposes a matrix
  // rows X cols --> cols X rows
  Matrix.prototype.transpose = function() {
    var result = new Matrix(this.cols, this.rows);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.matrix[i][j] = this.matrix[j][i];
      }
    }
    return result;
  }
  
  // This makes a copy of the matrix
  Matrix.prototype.copy = function() {
    var result = new Matrix(this.rows, this.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.matrix[i][j] = this.matrix[i][j];
      }
    }
    return result;
  }
  
  // This adds another matrix or a single value
  Matrix.prototype.add = function(other) {
    // Are we trying to add a Matrix?
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other.matrix[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other;
        }
      }
    }
  }
  
  // This multiplies another matrix or a single value
  // This is different than the dot() function!
  Matrix.prototype.multiply = function(other) {
    // Are we trying to multiply a Matrix?
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other.matrix[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other;
        }
      }
    }
  }
  
  
  // These are some static functions to operate on a matrix
  
  // This is the trickiest one
  // Takes a function and applies it to all values in the matrix
  Matrix.map = function(m, fn) {
    var result = new Matrix(m.rows, m.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.matrix[i][j] = fn(m.matrix[i][j]);
      }
    }
    return result;
  }
  
  // Subtracts one matrix from another
  Matrix.subtract = function(a, b) {
    var result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
      }
    }
    return result;
  }
  
  
  // Multiplies two matrices together
  Matrix.dot = function(a, b) {
    // Won't work if columns of A don't equal columns of B
    if (a.cols != b.rows) {
      console.log("Incompatible matrix sizes!");
      return;
    }
    // Make a new matrix
    var result = new Matrix(a.rows, b.cols);
    for (var i = 0; i < a.rows; i++) {
      for (var j = 0; j < b.cols; j++) {
        // Sum all the rows of A times columns of B
        var sum = 0;
        for (var k = 0; k < a.cols; k++) {
          sum += a.matrix[i][k] * b.matrix[k][j];
        }
        // New value
        result.matrix[i][j] = sum;
      }
    }
    return result;
  }
  
  
  // Turn a 1 dimensional array into a matrix
  Matrix.fromArray = function(array) {
    var m = new Matrix(array.length, 1);
    for (var i = 0; i < array.length; i++) {
      m.matrix[i][0] = array[i];
    }
    return m;
  }