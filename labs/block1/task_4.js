'use strict';

function calcQuantityUniqWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const uniqWords = [];

    for (let i = 0; i < arrayOfWords.length; i++) {
        let count = 0;

        for (let j = 0; j < arrayOfWords.length; j++) {
            if (arrayOfWords[i] === arrayOfWords[j]) {
                count++;
            }
        }

        if (count === 1) {
            uniqWords.push(arrayOfWords[i]);
        }
    }

    return uniqWords.length;
}
