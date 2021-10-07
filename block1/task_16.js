"use strict";

function matrixAddition(matrix1, matrix2) {
  const result = [];

  for (let i = 0; i < matrix1.length; i++) {
    result.push([]);
  }

  for (let k = 0; k < matrix1.length; k++) {
    for (let j = 0; j < matrix1[k].length; j++) {
      const number = matrix1[k][j] + matrix2[k][j];

      result[k].push(number);
    }
  }

  return result;
}
