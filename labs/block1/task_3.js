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

function calcQuantityDigits(number) {
    const numbers = convertNumberToArray(number);
    const result = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < numbers.length; i++) {
        result[numbers[i]] = 0;
    }

    // Подсчет количества чисел
    for (let i = 0; i < numbers.length; i++) {
        result[numbers[i]]++;
    }

    return result;
}
