'use strict';

function calcQuantityWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const map = new Map();
    let result = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];

        map[word] = 0;
    }

    // Подсчет количества слов
    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];

        map[word] += 1;
    }

    result = { ...map };

    return result;
}
