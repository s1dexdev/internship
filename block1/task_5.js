'use strict';

function calcQuantityWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    let result = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]] = 0;
    }

    // Подсчет количества слов
    for (let i = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]]++;
    }

    return result;
}
