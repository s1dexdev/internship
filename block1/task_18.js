'use strict';

// Task 1 ---------

function isAnagram(strOne, strTwo, i) {
    i = i || 0;

    const wordOne = strOne.toLowerCase().trim();
    const wordTwo = strTwo.toLowerCase().trim();

    if (wordOne.length !== wordTwo.length) {
        return false;
    }

    if (i < wordOne.length) {
        let counter1 = 0;
        let counter2 = 0;
        let letterOne = wordOne[i];

        (function loopWordTwo(j) {
            j = j || 0;

            if (j < wordOne.length) {
                let letterTwo = wordOne[j];

                if (letterOne === letterTwo) {
                    counter1 += 1;
                }

                letterTwo = wordTwo[j];

                if (letterOne === letterTwo) {
                    counter2 += 1;
                }

                loopWordTwo(++j);
            }
        })();

        if (counter1 !== counter2) {
            return false;
        }

        return isAnagram(strOne, strTwo, ++i);
    }

    return true;
}

// Task 3 ---------

function convertNumberToArray(number) {
    const arr = [];
    let code = number;

    while (code > 0) {
        arr.push(code % 10);

        code = parseInt(code / 10);
    }
    arr.reverse();

    return arr;
}

function calcQuantityOfDigits(number) {
    const numbers = convertNumberToArray(number);
    const result = {};

    // Инициализация свойств объекта result
    (function initProps(j) {
        j = j || 0;

        if (j < numbers.length) {
            const digit = numbers[j];

            result[digit] = 0;
            initResultProps(++j);
        }
    })();

    // Подсчет количества чисел
    (function calcDigits(k) {
        k = k || 0;

        if (k < numbers.length) {
            const digit = numbers[k];

            result[digit] += 1;
            calcDigits(++k);
        }
    })();

    return result;
}

// Task 4 ---------

function calcQuantityUniqWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const uniqWords = [];

    (function findUniqWord(i) {
        i = i || 0;
        const word = arrayOfWords[i];
        let count = 0;

        if (i < arrayOfWords.length) {
            const calcQuantity = j => {
                j = j || 0;

                if (j < arrayOfWords.length) {
                    if (word === arrayOfWords[j]) {
                        count += 1;
                    }

                    calcQuantity(++j);
                }
            };

            calcQuantity();

            if (count === 1) {
                uniqWords.push(word);
            }

            findUniqWord(++i);
        }
    })();

    return uniqWords.length;
}

// Task 5 ---------

function calcQuantityWords(str) {
    const arrayOfWords = str.toLowerCase().split(' ');
    const map = new Map();
    let result = {};

    // Инициализация свойств объекта result
    (function initProps(i) {
        i = i || 0;

        if (i < arrayOfWords.length) {
            const word = arrayOfWords[i];

            map[word] = 0;
            initProps(++i);
        }
    })();

    // Подсчет количества слов
    (function calcWords(j) {
        j = j || 0;

        if (j < arrayOfWords.length) {
            const word = arrayOfWords[j];

            map[word] += 1;
            calcWords(++j);
        }
    })();

    result = { ...map };

    return result;
}

// Task 6 ---------

function fibonacci(number) {
    if (number === 0) {
        return [];
    }

    const numbersFibonacci = [0, 1];

    (function calcFib(i) {
        i = i || 0;

        if (i < number - 1) {
            let fib = numbersFibonacci[i] + numbersFibonacci[i + 1];

            numbersFibonacci.push(fib);

            calcFib(++i);
        }
    })();

    return numbersFibonacci;
}

// Task 8 ---------

function factorial(number) {
    if (number === 0) {
        return 1;
    } else {
        return number * factorial(number - 1);
    }
}

// Task 9 ---------

function sumMultiplyOfTwo(arr) {
    let sum = 0;

    (function recurse(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number % 2 === 0) {
                sum += number;
            }

            recurse(++i);
        }
    })();

    return sum;
}

function sumMultiplyOfThree(arr) {
    let sum = 0;

    (function recurse(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number % 3 === 0) {
                sum += number;
            }

            recurse(++i);
        }
    })();

    return sum;
}

function sumPositiveOddNumbers(arr) {
    let sum = 0;

    (function recurse(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number > 0 && number % 2 !== 0) {
                sum += number;
            }

            recurse(++i);
        }
    })();

    return sum;
}
