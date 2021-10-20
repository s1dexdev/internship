'use strict';

function matrixTranspotion(matrix) {
    const matrixT = [];

    for (let i = 0; i < matrix.length; i++) {
        matrixT.push([]);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrixT[j].push(matrix[i][j]);
        }
    }

    return matrixT;
}
