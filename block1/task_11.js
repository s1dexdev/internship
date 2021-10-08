'use strict';

//  Преобразование числа в массив цифр
function convertNumberToArray(number) {
    const arr = [];
    let code = number;

    while (code > 0) {
        arr.push(code % 10);

        code = parseInt(code / 10);
    }
    arr.reverse();

    return arr;
}

function convertDecimalToBinary(n) {
    let result = [];
    let number = n;

    result.push(number % 2);

    while (number > 1) {
        number = parseInt(number / 2);
        result.push(number % 2);
    }

    result = Number(result.reverse().join(''));

    return result;
}

function convertBinaryToDecimal(n) {
    const numbers = convertNumberToArray(n);
    let result = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        result += number * 2 ** (numbers.length - 1 - i);
    }

    return result;
}
