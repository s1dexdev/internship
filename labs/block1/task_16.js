'use strict';

function matrixAddition(matrix1, matrix2) {
    const result = [];

    for (let i = 0; i < matrix1.length; i++) {
        result.push([]);
    }

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[i].length; j++) {
            const number = matrix1[i][j] + matrix2[i][j];

            result[i].push(number);
        }
    }

    return result;
}
