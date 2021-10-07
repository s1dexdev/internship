function calcQuantityZero(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];

    if (number === 0) {
      quantity += 1;
    }
  }

  return quantity;
}

function calcQuantityNegativeNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];

    if (number < 0) {
      quantity += 1;
    }
  }

  return quantity;
}

function calcQuantityPositiveNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    let number = arr[i];

    if (number > 0) {
      quantity += 1;
    }
  }

  return quantity;
}

function calcQuantityPrimeNumbers(arr) {
  let quantity = 0;

  for (let i = 0; i < arr.length; i++) {
    let isPrime = true;
    let number = arr[i];

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

  return quantity;
}
