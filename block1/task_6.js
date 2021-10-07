"use strict";

function fibonacci(number) {
  if (number === 0) {
    return [];
  }

  const numbersFibonacci = [0, 1];

  for (let i = 0; i < number - 1; i++) {
    let fib = numbersFibonacci[i] + numbersFibonacci[i + 1];

    numbersFibonacci.push(fib);
  }

  return numbersFibonacci;
}
