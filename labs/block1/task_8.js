'use strict';

function factorial(number) {
    let factorial = 1;

    if (number <= 1) {
        return factorial;
    }

    for (let i = 0; i < number; i++) {
        factorial *= number - i;
    }

    return factorial;
}
