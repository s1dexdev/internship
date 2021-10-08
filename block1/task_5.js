'use strict';

function calcQuantityWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const map = new Map();
    let result = {};

    for (let i = 0; i < arrayOfWords.length; i++) {
        map[arrayOfWords[i]] = 0;
    }

    for (let i = 0; i < arrayOfWords.length; i++) {
        map[arrayOfWords[i]] += 1;
    }

    result = { ...map };

    return result;
}
