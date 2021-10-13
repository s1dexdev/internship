'use strict';

function calcQuantityDigigts(arr, callback) {
    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        let number = arr[i];

        if (callback(number)) {
            quantity++;
        }
    }

    return quantity;
}

const array = [-1, 0, 1, 2, 3, 4, 5, 6, 0, 7];

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
