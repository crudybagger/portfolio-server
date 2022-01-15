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
Matrix.prototype.randomize = function () {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = randomGaussian();
    }
  }
};

// Take the matrix and make it a 1 dimensional array
Matrix.prototype.toArray = function () {
  var arr = [];
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      arr.push(this.matrix[i][j]);
    }
  }
  return arr;
};

// This transposes a matrix
Matrix.prototype.transpose = function () {
  var result = new Matrix(this.cols, this.rows);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[j][i];
    }
  }
  return result;
};

// This makes a copy of the matrix
Matrix.prototype.copy = function () {
  var result = new Matrix(this.rows, this.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[i][j];
    }
  }
  return result;
};

// This adds another matrix or a single value
Matrix.prototype.add = function (other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other.matrix[i][j];
      }
    }
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other;
      }
    }
  }
};

Matrix.prototype.multiply = function (other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other.matrix[i][j];
      }
    }
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other;
      }
    }
  }
};

Matrix.map = function (m, fn) {
  var result = new Matrix(m.rows, m.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = fn(m.matrix[i][j]);
    }
  }
  return result;
};

Matrix.subtract = function (a, b) {
  var result = new Matrix(a.rows, a.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
    }
  }
  return result;
};

Matrix.dot = function (a, b) {
  // Won't work if columns of A don't equal columns of B
  if (a.cols != b.rows) {
    console.log('Incompatible matrix sizes!');
    return;
  }

  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.matrix[i][k] * b.matrix[k][j];
      }
      result.matrix[i][j] = sum;
    }
  }
  return result;
};

Matrix.fromArray = function (array) {
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
};

//   let A = new Matrix(3, 2);
// console.log("A created!! ");
// A.randomize();
// console.log("A Randomized!!");

// let B = new Matrix(2, 3);
// B.randomize();
// A = Matrix.Mult(A, B);
// A.map(tanh);
// console.table(A.data);

// var pos = 0;
// var n = 10000;
// for(var i = 0; i < n; i++){
//     let A = new NeuralNetwork(3, [5, 5], 2);
//     ip = [0.1, 0.8, 0.5];
//     B = A.predict(ip);
//     //console.log(B[0][0], B[1][0])
//     // console.log(B[0][0] - B[1][0]);
//     if(B[0][0] > B[1][0]){
//         pos = pos+1;
//     }
//     // pos = pos + Math.abs(B[0][0] - B[1][0]);
// }
// pos = pos/n;
// console.log(pos);
// //0.05
