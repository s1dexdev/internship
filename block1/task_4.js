'use strict';

function calcQuantityUniqWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const uniqWords = [];

    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];
        let count = 0;

        for (let j = 0; j < arrayOfWords.length; j++) {
            if (word === arrayOfWords[j]) {
                count++;
            }
        }

        if (count === 1) {
            uniqWords.push(word);
        }
    }

    return uniqWords.length;
}
