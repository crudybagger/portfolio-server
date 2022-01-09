class NeuralNetwork {
    constructor(ip, hidd, op){
        this.input_nodes = ip;
        this.output_nodes = op;
        this.hidden_nodes = hidd;
        this.storage = [];

        this.layers = [];
        this.bias = [];
        this.layers.push(new Matrix(this.hidden_nodes[0], ip));
        this.bias.push(new Matrix(this.hidden_nodes[0], 1))

        for(var i = 0; i < hidd.length - 1; i++){
            this.layers.push(new Matrix(this.hidden_nodes[i+1], this.hidden_nodes[i]))
            this.bias.push(new Matrix(this.hidden_nodes[i+1], 1));
        }
        this.layers.push(new Matrix(op, this.hidden_nodes[hidd.length - 1]));
        this.bias.push(new Matrix(op, 1));
    }
    predict(input){
        var inp = Matrix.to1DMatrix(input);
        var p = Matrix.Mult(this.layers[0], inp);
        this.storage.push(Matrix.Add(p, this.bias[0]));
        for(var i = 1; i < this.layers.length; i++){
            p = Matrix.Mult(this.layers[i], this.storage[this.storage.length -1]);
            this.storage.push(Matrix.Add(p, this.bias[i]));
            // this.storage[this.storage.lengt-1].activation();
        }
        var out = this.storage[this.storage.length -1].toArray();
        return out[0];
    }

    copy(){
        var copy = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
        copy.layers = this.layers;
        copy.bias = this.bias;

        return copy;
    }
    
    mutate(r){
        var child = this.copy();
        for(var i = 0; i < this.layers.length; i++){
            child.layers[i] = this.layers[i].mutate(r);
            child.bias[i] = this.bias[i].mutate(r);
        }
        return child;
    }
}