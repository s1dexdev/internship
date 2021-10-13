'use strict';

function calcQuantityPrimeDigits(arr) {
    let quantity = 0;

    for (let i = 0; i < arr.length; i++) {
        let isPrime = true;
        let number = arr[i];

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

    return quantity;
}

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
