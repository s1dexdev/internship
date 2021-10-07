"use strict";

function calcMeanValue(arr) {
  const arrayOfNumbers = arr.flat();
  let result = 0;
  let sum = 0;

  for (let i = 0; i < arrayOfNumbers.length; i++) {
    const number = arrayOfNumbers[i];

    sum += number;
  }

  result = parseInt(sum / arrayOfNumbers.length);

  return result;
}
