function sumElem(min, max) {
  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
}

function sumElemMultiplyOfThree(min, max) {
  let sum = 0;

  for (let i = min; i <= max; i++) {
    if (i % 3 === 0) {
      sum += i;
    }
  }

  return sum;
}

function sumPositiveElem(min, max) {
  let sum = 0;

  for (let i = min; i <= max; i++) {
    if (i > 0) {
      sum += i;
    }
  }

  return sum;
}
