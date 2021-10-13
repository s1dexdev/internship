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

calcSumElems(-5, 20, item => item % 3 === 0); //Сумма чисел кратных трем в диапазоне от min до max
calcSumElems(-5, 20, item => item > 0); //Сумма положительных чисел в диапазоне от min до max
calcSumElems(-5, 20, item => true); //Сумма всех чисел в диапазоне от min до max
