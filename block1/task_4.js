"use strict";

function calcQuantityUniqWords(str) {
  const arrayOfWords = str.toLowerCase().split(" ");
  const uniqWords = new Set();

  for (let i = 0; i < arrayOfWords.length; i++) {
    uniqWords.add(arrayOfWords[i]);
  }

  return uniqWords.size;
}
