"use strict";

function calcSumMultiplyOfTwo(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number % 2 == 0) {
        sum += number;
      }
    }
  }

  return sum;
}

function calcSumMultiplyOfThree(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number % 3 == 0) {
        sum += number;
      }
    }
  }

  return sum;
}

function calcSumPositiveOddNumbers(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number > 0 && number % 2 !== 0) {
        sum += number;
      }
    }
  }

  return sum;
}

function calcQuantityZero(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number === 0) {
        quantity += 1;
      }
    }
  }

  return quantity;
}

function calcQuantityNegativeNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number < 0) {
        quantity += 1;
      }
    }
  }

  return quantity;
}

function calcQuantityPositiveNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];

      if (number > 0) {
        quantity += 1;
      }
    }
  }

  return quantity;
}

function calcQuantityPrimeNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
      let isPrime = true;
      let number = arr[i][k];

      for (let j = 2; j < number; j++) {
        if (number % j === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime && number > 1) {
        quantity += 1;
      }
    }
  }

  return quantity;
}
