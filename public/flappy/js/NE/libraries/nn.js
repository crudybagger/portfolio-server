NeuralNetwork.sigmoid = function (x) {
  var y = 1 / (1 + Math.pow(Math.E, -x));
  return y;
};
NeuralNetwork.dSigmoid = function (x) {
  return x * (1 - x);
};

NeuralNetwork.tanh = function (x) {
  var y = Math.tanh(x);
  return y;
};

NeuralNetwork.dtanh = function (x) {
  var y = 1 / pow(Math.cosh(x), 2);
  return y;
};

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

function NeuralNetwork(inputnodes, hiddennodes, outputnodes, activation) {
  if (activation == 'tanh') {
    this.activation = NeuralNetwork.tanh;
    this.derivative = NeuralNetwork.dtanh;
  } else {
    this.activation = NeuralNetwork.sigmoid;
    this.derivative = NeuralNetwork.dSigmoid;
  }

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
    this.inodes = inputnodes;
    this.hnodes = hiddennodes;
    this.onodes = outputnodes;

    this.wih = new Matrix(this.hnodes, this.inodes);
    this.who = new Matrix(this.onodes, this.hnodes);
    this.wih.randomize();
    this.who.randomize();
  }
}

NeuralNetwork.prototype.copy = function () {
  return new NeuralNetwork(this);
};

NeuralNetwork.prototype.mutate = function () {
  this.wih = Matrix.map(this.wih, mutate);
  this.who = Matrix.map(this.who, mutate);
};

NeuralNetwork.prototype.train = function (inputs_array, targets_array) {
  var inputs = Matrix.fromArray(inputs_array);
  var targets = Matrix.fromArray(targets_array);

  var hidden_inputs = Matrix.dot(this.wih, inputs);
  var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  var outputs = Matrix.map(output_inputs, this.activation);

  var output_errors = Matrix.subtract(targets, outputs);

  var whoT = this.who.transpose();
  var hidden_errors = Matrix.dot(whoT, output_errors);

  var gradient_output = Matrix.map(outputs, this.derivative);
  gradient_output.multiply(output_errors);
  gradient_output.multiply(this.lr);

  var gradient_hidden = Matrix.map(hidden_outputs, this.derivative);
  gradient_hidden.multiply(hidden_errors);
  gradient_hidden.multiply(this.lr);

  var hidden_outputs_T = hidden_outputs.transpose();
  var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
  this.who.add(deltaW_output);

  var inputs_T = inputs.transpose();
  var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
  this.wih.add(deltaW_hidden);
};

NeuralNetwork.prototype.query = function (inputs_array) {
  var inputs = Matrix.fromArray(inputs_array);

  var hidden_inputs = Matrix.dot(this.wih, inputs);
  var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  var outputs = Matrix.map(output_inputs, this.activation);

  return outputs.toArray();
};

// function Matrix(rows, cols) {
//     this.rows = rows;
//     this.cols = cols;
//     this.matrix = new Array(rows);
//     for (var i = 0; i < this.rows; i++) {
//       this.matrix[i] = new Array(cols);
//       for (var j = 0; j < this.cols; j++) {
//         this.matrix[i][j] = 0;
//       }
//     }
//   }
//     Matrix.prototype.randomize = function() {
//     for (var i = 0; i < this.rows; i++) {
//       for (var j = 0; j < this.cols; j++) {
//         this.matrix[i][j] = Math.random(-1, 1);
//       }
//     }
//   }

//   Matrix.prototype.toArray = function() {
//     var arr = [];
//     for (var i = 0; i < this.rows; i++) {
//       for (var j = 0; j < this.cols; j++) {
//         arr.push(this.matrix[i][j]);
//       }
//     }
//     return arr;
//   }

//   Matrix.prototype.transpose = function() {
//     var result = new Matrix(this.cols, this.rows);
//     for (var i = 0; i < result.rows; i++) {
//       for (var j = 0; j < result.cols; j++) {
//         result.matrix[i][j] = this.matrix[j][i];
//       }
//     }
//     return result;
//   }

//   Matrix.prototype.copy = function() {
//     var result = new Matrix(this.rows, this.cols);
//     for (var i = 0; i < result.rows; i++) {
//       for (var j = 0; j < result.cols; j++) {
//         result.matrix[i][j] = this.matrix[i][j];
//       }
//     }
//     return result;
//   }

//   Matrix.prototype.add = function(other) {
//     if (other instanceof Matrix) {
//       for (var i = 0; i < this.rows; i++) {
//         for (var j = 0; j < this.cols; j++) {
//           this.matrix[i][j] += other.matrix[i][j];
//         }
//       }
//     } else {
//       for (var i = 0; i < this.rows; i++) {
//         for (var j = 0; j < this.cols; j++) {
//           this.matrix[i][j] += other;
//         }
//       }
//     }
//   }

//   Matrix.prototype.multiply = function(other) {
//     if (other instanceof Matrix) {
//       for (var i = 0; i < this.rows; i++) {
//         for (var j = 0; j < this.cols; j++) {
//           this.matrix[i][j] *= other.matrix[i][j];
//         }
//       }
//     } else {
//       for (var i = 0; i < this.rows; i++) {
//         for (var j = 0; j < this.cols; j++) {
//           this.matrix[i][j] *= other;
//         }
//       }
//     }
//   }

//   Matrix.map = function(m, fn) {
//     var result = new Matrix(m.rows, m.cols);
//     for (var i = 0; i < result.rows; i++) {
//       for (var j = 0; j < result.cols; j++) {
//         result.matrix[i][j] = fn(m.matrix[i][j]);
//       }
//     }
//     return result;
//   }

//   Matrix.subtract = function(a, b) {
//     var result = new Matrix(a.rows, a.cols);
//     for (var i = 0; i < result.rows; i++) {
//       for (var j = 0; j < result.cols; j++) {
//         result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
//       }
//     }
//     return result;
//   }

//   // Multiplies two matrices together
//   Matrix.dot = function(a, b) {
//     // Won't work if columns of A don't equal columns of B
//     if (a.cols != b.rows) {
//       console.log("Incompatible matrix sizes!");
//       return;
//     }
//     // Make a new matrix
//     var result = new Matrix(a.rows, b.cols);
//     for (var i = 0; i < a.rows; i++) {
//       for (var j = 0; j < b.cols; j++) {
//         // Sum all the rows of A times columns of B
//         var sum = 0;
//         for (var k = 0; k < a.cols; k++) {
//           sum += a.matrix[i][k] * b.matrix[k][j];
//         }
//         // New value
//         result.matrix[i][j] = sum;
//       }
//     }
//     return result;
//   }

//   // Turn a 1 dimensional array into a matrix
//   Matrix.fromArray = function(array) {
//     var m = new Matrix(array.length, 1);
//     for (var i = 0; i < array.length; i++) {
//       m.matrix[i][0] = array[i];
//     }
//     return m;
//   }
