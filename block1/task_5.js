'use strict';

function calcQuantityWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    let result = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];

        result[word] = 0;
    }

    // Подсчет количества слов
    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];

        result[word]++;
    }

    return result;
}
