class Matrix{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.data = [];
        for(var i = 0; i < rows; i++){
            this.data.push(new Array(columns));
            for(var j = 0; j < columns; j++){
                this.data[i][j] = random(-1, 1);
            }
        }
    }
    static Mult(matrix1, matrix2){
        if(matrix2.rows != matrix1.columns){
            return -1;
        }
        let prod = new Matrix(matrix1.rows, matrix2.columns);
        var sum = 0;
        for(var i = 0; i < matrix1.rows; i++){
            for(var j = 0; j < matrix2.columns; j++){
                sum = 0;
                for(var k = 0; k < matrix1.columns; k++){
                    sum += matrix1.data[i][k] * matrix2.data[k][j];
                }
                prod.data[i][j] = sum;
            }
        }
        return prod;
    }

    static Add(matrix1, matrix2){
        if(matrix1.rows != matrix2.rows || matrix1.columns != matrix2.columns){
            console.error("Dimension Mismatch!!, Cannot add");
        }
        var sum = new Matrix(matrix1.rows, matrix1.columns);
        for(var i = 0; i < matrix1.rows; i++){
            for(var j = 0; j < matrix2.columns; j++){
                sum.data[i][j] = matrix1.data[i][j] + matrix2.data[i][j];
            }
        }
        return sum;
    }
    
    static to1DMatrix(arr){
        var mat = new Matrix(arr.length, 1);
        for(var i = 0; i < arr.length; i++){
            mat.data[i][0] = arr[i];
        }
        return mat;
    }
    toArray(){
        var arr = this.data;
        return arr;
    }

    randomize(){
        for(var i = 0; i < this.columns; i++){
            for(var j = 0; j < this.rows; j++){
                this.data[j][i] = Math.random(1);
            }
        }
    }
    
    normalise(){
        var sum = 0;
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                sum += this.data[i][j]
            }
        }
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                this.data[i][j] = this.data[i][j]/sum;
            }
        }
    }

    mutate(r){
        var child = new Matrix(this.rows, this.columns);
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                // var offset = randomGaussian() * 0.5;
                child.data[i][j] = mutate(this.data[i][j], r) ;
            }
        }
        child.map(tanh);
        return child;
    }

    map(func){
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                this.data[i][j] = func(this.data[i][j]);
            }
        }
    }
}
function sigmoid(x){
    let newx = 1/(1 + Math.exp(x));
    return newx;
}
function tanh(x){
    let newx = Math.tanh(x);
    return newx;
}
function mutate(x, r){

    if (random(0,1) < r){
        //var offset = randomGaussian()* 0.5;
        var offset = random(-0.05, 0.05);
        var newx = x + offset;
        return newx;
    } else {
        return x;
    }
}