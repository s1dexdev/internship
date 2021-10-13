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

function calcQuantityPrimeDigits(arr) {
    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let number = arr[i][j];
            let isPrime = true;

            for (let i = 2; i < number; i++) {
                if (number % i === 0) {
                    isPrime = false;

                    break;
                }
            }
            if (isPrime && number > 1) {
                quantity++;
            }
        }
    }

    return quantity;
}

// function cb(num) {
//     // return num % 2 === 0;
//     // return num % 3 === 0;
//     // return num > 0 && num % 2 !== 0;
//     // return num === 0;
//     // return num > 0;
//     // return num < 0;
//     // return true;
// }
