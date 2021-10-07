function sumMultiplyOfTwo(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];
    if (number % 2 === 0) {
      sum += number;
    }
  }

  return sum;
}

function sumMultiplyOfThree(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];

    if (number % 3 === 0) {
      sum += number;
    }
  }

  return sum;
}

function sumPositiveOddNumbers(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];

    if (number > 0 && number % 2 !== 0) {
      sum += number;
    }
  }

  return sum;
}
