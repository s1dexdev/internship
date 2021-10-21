'use strict';

function calcSumElems(arr, callback) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            sum += arr[i];
        }
    }

    return sum;
}

const array = [-2, -1, 0, 1, 2, 3, 4, 5, 6];

calcSumElems(array, number => true); // Сумма всех элементов массива
calcSumElems(array, number => number % 2); // Сумма элементов массива кратных двум
calcSumElems(array, number => number % 3); // Сумма элементов массива кратных трем
calcSumElems(array, number => number > 0 && number % 2 !== 0); // Сумма элементов массива положительных и нечетных
