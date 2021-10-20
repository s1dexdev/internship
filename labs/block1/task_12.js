'use strict';

function calcSumDigits(arr, callback) {
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

function calcQuantityDigits(arr, callback, isFlag) {
    isFlag = isFlag || false; //Флаг на проверку простых чисел
    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let isPrime = true;
            let number = arr[i][j];

            if (isFlag) {
                for (let k = 2; k < number; k++) {
                    if (number % k === 0) {
                        isPrime = false;

                        break;
                    }
                }
            }

            if (callback(number, isPrime)) {
                quantity++;
            }
        }
    }

    return quantity;
}

const array = [
    [-1, 0, 1, 2],
    [2, 3, 4, 0],
    [5, 6, 0, 7],
];

// Сумма элементов
calcSumDigits(array, number => true); // Сумма всех элементов массива
calcSumDigits(array, number => number % 2); // Сумма элементов массива кратных двум
calcSumDigits(array, number => number % 3); // Сумма элементов массива кратных трем
calcSumDigits(array, number => number > 0 && number % 2 !== 0); // Сумма элементов массива положительных и нечетных

// Количество элементов
calcQuantityDigits(array, number => number === 0); //Количество нулей в массиве
calcQuantityDigits(array, number => number < 0); //Количество отрицательных элементов в массиве
calcQuantityDigits(array, number => number > 0); //Количество положительных элементов в массиве
calcQuantityDigits(array, (number, isPrime) => isPrime && number > 1, true); //Количество простых чисел в массиве
