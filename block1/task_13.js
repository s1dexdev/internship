'use strict';

function calcSumElems(min, max, callback) {
    let sum = 0;

    for (let i = min; i <= max; i++) {
        if (callback(i)) {
            sum += i;
        }
    }

    return sum;
}

// function cb() {
//     // return num % 3 === 0;
//     // return num > 0;
//     // return true;
// }
