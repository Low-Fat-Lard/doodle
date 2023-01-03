class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (let row = 0; row < this.rows; row++) {
      this.data[row] = [];
      for (let col = this.cols; col < this.cols; col++) {
        this.data[row][col] = 0;
      }
    }
  }

  /**
   * @param {Number} num scaler value
   * @return {Matrix} Matrix Object
   */
  scaler(num) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = this.cols; col < this.cols; col++) {
        this.data[row][col] *= num;
      }
    }
  }

  multiply(matrix) {
    if (matrix instanceof Matrix) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] *= matrix.data[row][col];
        }
      }
    } else {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] *= matrix;
        }
      }
    }
  }

  /**
   * @static
   * @param  {Matrix} matrix1 matrix object
   * @param  {Matrix} matrix2 matrix object
   * @returns {matrix }
   */
  static multiply(matrix1, matrix2) {
    if (matrix1.cols !== matrix2.rows) {
      return undefined;
    } else {
      let result = new Matrix(matrix1.rows, matrix2.cols);
      for (let row = 0; row < result.rows; row++) {
        for (let col = 0; col < result.cols; col++) {
          let sum = 0;
          for (let k = 0; k < matrix1.cols; k++) {
            sum += matrix1.data[row][k] * matrix2.data[k][col];
          }
          result.data[row][col] = sum;
        }
      }
      return result;
    }
  }
  /**
   * @param {Number} num  value to be added
   * @returns {Matrix} Matrix Object
   */
  add(num) {
    if (num instanceof Matrix) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] += num.data[row][col];
        }
      }
    } else {
      for (let row = 0; row < this.rows; row++) {
        for (let col = this.cols; col < this.cols; col++) {
          this.data[row][col] += num;
        }
      }
    }
  }

  /**
   * @param { Matrix } m1 matrix object
   * @param { matrix } m2 matrix object
   * @returns {Matrix} returns a subtracted matrix
   */

  static substract(m1, m2) {
    let result = new Matrix(m1.cols, m2.rows);
    for (let row = 0; row < result.rows; row++) {
      for (let col = 0; col < result.cols; col++) {
        result.data[col][row] = m1.data[row][col] - m2.data[col][row];
      }
    }
    return result;
  }

  /**
   *@return {Matrix} Matrix object with randomized value
   */
  randomize() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.data[row][col] = Math.floor(Math.random() * 2 - 1);
      }
    }
  }

  /**
   * @returns {Matrix} A resulting matrix transposed vector.
   */
  static transpose(mat) {
    let result = new Matrix(mat.cols, mat.rows);
    for (let row = 0; row < mat.rows; row++) {
      for (let col = 0; col < mat.cols; col++) {
        result.data[col][row] = mat.data[row][col];
      }
    }
    return result;
  }

  /**
   * @param  {function} func takes function
   */
  map(func) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.data[row][col] = func(this.data[row][col], row, col);
      }
    }
  }
  /**
   *
   * @static
   * @param {Matrix} matrix matrix which will be mapped
   * @param {function} func  function which will give the mapping
   * @returns {Matrix} matrix which was mapped
   */
  static map(matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols);
    for (let row = 0; row < result.rows; row++) {
      for (let col = 0; col < result.cols; col++) {
        result.data[row][col] = func(matrix.data[row][col], row, col);
      }
    }
    return result;
  }
  /**
   * @param  {Matrix} matrix Input matrix object .
   * @returns {Array} output array of all the values.
   */
  static toArray(matrix) {
    let output = [];
    for (let row = 0; row < matrix.rows; row++) {
      for (let col = 0; col < matrix.cols; col++) {
        output.push(matrix.data[row][col]);
      }
    }
    return output;
  }
  /**
   *
   * @param {Array} inputs Array which needs to be converted.
   * @return {Matrix} matrix object
   */
  static fromArray(inputs) {
    let result = new Matrix(inputs.length, 1);
    for (let row = 0; row < result.rows; row++) {
      result.data[row][0] = inputs[row];
    }
    return result;
  }
  /**
   * @description print the matrix data in table format
   */
  print() {
    console.table(this.data);
  }
}