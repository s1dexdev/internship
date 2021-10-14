'use strict';

function calcQuantityDigits(arr, callback, isFlag) {
    isFlag = isFlag || false; //Флаг на проверку простых чисел

    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        let isPrime = true;
        let number = arr[i];

        if (isFlag) {
            for (let j = 2; j < number; j++) {
                if (number % j === 0) {
                    isPrime = false;

                    break;
                }
            }
        }

        if (callback(number, isPrime)) {
            quantity++;
        }
    }

    return quantity;
}

const array = [-1, 0, 1, 2, 3, 4, 5, 6, 0];

calcQuantityDigits(array, (number, isPrime) => isPrime && number > 1, true); //Количество простых чисел в массиве
calcQuantityDigits(array, number => number === 0); //Количество нулей в массиве
calcQuantityDigits(array, number => number < 0); //Количество отрицательных элементов в массиве
calcQuantityDigits(array, number => number > 0); //Количество положительных элементов в массиве
