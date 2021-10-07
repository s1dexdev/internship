function matrixTranspotion(matrix) {
  const matrixT = [];

  for (let i = 0; i < matrix.length; i++) {
    matrixT.push([]);
  }

  for (let k = 0; k < matrix.length; k++) {
    for (let j = 0; j < matrix[k].length; j++) {
      matrixT[j].push(matrix[k][j]);
    }
  }

  return matrixT;
}
