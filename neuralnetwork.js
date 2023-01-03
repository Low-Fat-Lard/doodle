function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function dsigmod(y){
 return (y * (1 - y));
}

class NeuralNetwork {
  constructor(inputcount, hiddencount, outputcount) {
    this.inputcount = inputcount;
    this.hiddencount = hiddencount;
    this.outputcount = outputcount;
    //inititalizing the weights
    //initializing weights between input node and hidden node.
    this.weights_ih = new Matrix(this.hiddencount, this.inputcount);
    this.weights_ih.randomize();
    //initializing the weights between output node and hidden node.
    this.weights_ho = new Matrix(this.outputcount, this.hiddencount);
    this.weights_ho.randomize();
    //bias for hiddde node
    this.bias_h = new Matrix(this.hiddencount, 1);
    this.bias_h.randomize();
    //bias for output node.
    this.bias_o = new Matrix(this.outputcount, 1);
    this.bias_o.randomize();
    this.learningrate = 0.1
  }
  feedForward(inputs) {
    //coverting the input into array
    if (!(inputs instanceof Matrix)) {
      inputs = Matrix.fromArray(inputs);
    }
    //Matrix multiplication between input to hidden weights and inputs
    let hiddenoutput = Matrix.multiply(this.weights_ih, inputs);
    //adding the bias
    hiddenoutput.add(this.bias_h);
    // Activation function
    hiddenoutput.map(sigmoid);
    //multiplying the hidden output with hidden to output weights
    let output = Matrix.multiply(this.weights_ho, hiddenoutput);
    //adding the bias
    output.add(this.bias_o);
    //Activation function
    output.map(sigmoid);

    return Matrix.toArray(output);
  }
  /**
   * training function of the neuralnetwork.
   */
  train(inputs, targets) {
    if (!(inputs instanceof Matrix)) {
      inputs = Matrix.fromArray(inputs);
    }
    if (!(targets instanceof Matrix)) {
      targets = Matrix.fromArray(targets);
    }
    //applying the feed forward algorithm

    if (!(inputs instanceof Matrix)) {
      inputs = Matrix.fromArray(inputs);
    }
    //Matrix multiplication between input to hidden weights and inputs
    let hiddenoutput = Matrix.multiply(this.weights_ih, inputs);
    //adding the bias
    hiddenoutput.add(this.bias_h);
    // Activation function
    hiddenoutput.map(sigmoid);
    //multiplying the hidden output with hidden to output weights
    let output = Matrix.multiply(this.weights_ho, hiddenoutput);
    //adding the bias
    output.add(this.bias_o);
    //Activation function
    output.map(sigmoid);

    
    
    //calculating the output error
    //error =  target - error
    let output_errors = Matrix.substract(targets, output);
    //calculating the output error transposed
    let weights_ho_t = Matrix.transpose(this.weights_ho);
    //calculting the hidden error
    let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);
     

  //calculating the gradients for hidden layer to output layer 
    let outputgradient =  Matrix.map(output,dsigmod);
    //multiplying the output error
    outputgradient.multiply(output_errors);
    //multiplying with learnign rate 
    outputgradient.multiply(this.learningrate);
    //multiplying with hidden output with tranposed
    let hidden_t = Matrix.transpose(hiddenoutput);
    let deltaweight_ho = Matrix.multiply(outputgradient,hidden_t);
    //correction the weights between hidden to output
    this.weights_ho.add(deltaweight_ho);
    //adjusting the bias of output layer
    this.bias_o.add(outputgradient);

    //calculatin the gradients between input to hidden layer
    let inputgradient = Matrix.map(hiddenoutput,dsigmod);
    //multiplying with hidden error 
    inputgradient.multiply(hidden_errors);
    //multiplying with learning rate
    inputgradient.multiply(this.learningrate);
    let input_t = Matrix.transpose(inputs);
    //delta weight for input layer to hidden layer.
    let deltaweight_ih = Matrix.multiply(inputgradient,input_t);
    this.weights_ih.add(deltaweight_ih);
    //adjusting the bias of hidden layer
    this.bias_h.add(inputgradient);  
    
  }
}