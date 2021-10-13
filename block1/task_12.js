'use strict';

function calcSumDigigts(arr, callback) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let number = arr[i][j];

            if (callback(number)) {
                sum += number;
            }
        }
    }

    return sum;
}

function calcQuantityDigigts(arr, callback) {
    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let number = arr[i][j];
            if (callback(number)) {
                quantity++;
            }
        }
    }

    return quantity;
}

const array = [-1, 0, 1, 2, 3, 4, 5, 6, 0, 7];

// Сумма элементов
calcSumElems(array, number => true); // Сумма всех элементов массива
calcSumElems(array, number => number % 2); // Сумма элементов массива кратных двум
calcSumElems(array, number => number % 3); // Сумма элементов массива кратных трем
calcSumElems(array, number => number > 0 && number % 2 !== 0); // Сумма элементов массива положительных и нечетных

// Количество элементов
calcQuantityDigigts(array, number => number === 0); //Количество нулей в массиве
calcQuantityDigigts(array, number => number < 0); //Количество отрицательных элементов в массиве
calcQuantityDigigts(array, number => number > 0); //Количество положительных элементов в массиве
calcQuantityDigigts(array, number => {
    let isPrime = true;

    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            isPrime = false;

            break;
        }
    }

    return isPrime && number > 1;
}); //Количество простых чисел в массиве
