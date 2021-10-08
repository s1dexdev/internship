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

// Подсчет количества чисел

function calcQuantityOfDigits(number) {
    const numbers = convertNumberToArray(number);
    const result = {};
    let maxDigit = numbers[0];
    let minDigit = numbers[0];

    // Нахождение минимального и максимального чисел
    for (let i = 0; i < numbers.length; i++) {
        maxDigit = numbers[i] > maxDigit ? numbers[i] : maxDigit;
        minDigit = numbers[i] < minDigit ? numbers[i] : minDigit;
    }

    // Определение свойств объекта
    for (let i = minDigit; i <= maxDigit; i++) {
        result[i] = 0;
    }

    // Подсчет количества чисел
    for (let i = 0; i < numbers.length; i++) {
        const digit = numbers[i];

        result[digit] += 1;
    }

    return result;
}
