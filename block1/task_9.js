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

function cb(num) {
    // return num % 2 === 0;
    // return num % 3 === 0;
    // return num > 0 && num % 2 !== 0;
    // return true;
}
