'use strict';

function calcSumElems(arr, callback) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let number = arr[i];

        if (callback(number)) {
            sum += number;
        }
    }

    return sum;
}

calcSumElems([-2, -1, 0, 1, 2, 3, 4, 5, 6], number => true); // Сумма всех элементов массива
calcSumElems([-2, -1, 0, 1, 2, 3, 4, 5, 6], number => number % 2); // Сумма элементов массива кратных двум
calcSumElems([-2, -1, 0, 1, 2, 3, 4, 5, 6], number => number % 3); // Сумма элементов массива кратных трем
calcSumElems(
    [-2, -1, 0, 1, 2, 3, 4, 5, 6],
    number => number > 0 && number % 2 !== 0,
); // Сумма элементов массива положительных и нечетных
