'use strict';

// Task 1 ---------

function isAnagram(strOne, strTwo, index) {
    index = index || 0;

    const wordOne = strOne.toLowerCase().trim();
    const wordTwo = strTwo.toLowerCase().trim();

    if (wordOne.length !== wordTwo.length) {
        return false;
    }

    if (index < wordOne.length) {
        let counter1 = 0;
        let counter2 = 0;
        let letterOne = wordOne[index];

        (function _isAnagram(j) {
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

                _isAnagram(++j);
            }
        })();

        if (counter1 !== counter2) {
            return false;
        }

        return isAnagram(strOne, strTwo, ++index);
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

function fibonacci(number, numbersFib, index) {
    index = index || 0;
    numbersFib = numbersFib || [0, 1];

    if (number <= 0) {
        return [];
    } else {
        if (index < number - 1) {
            let fib = numbersFib[index] + numbersFib[index + 1];

            numbersFib.push(fib);

            return fibonacci(number, numbersFib, ++index);
        }
    }

    return numbersFib;
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

// Task 10 ---------

function calcQuantityZero(arr, quantity, index) {
    index = index || 0;
    quantity = quantity || 0;

    if (index === arr.length) {
        return quantity;
    } else {
        if (arr[index] === 0) {
            quantity += 1;

            return calcQuantityZero(arr, quantity, ++index);
        } else {
            return calcQuantityZero(arr, quantity, ++index);
        }
    }
}

function calcQuantityNegativeNumbers(arr, quantity, index) {
    index = index || 0;
    quantity = quantity || 0;

    if (index === arr.length) {
        return quantity;
    } else {
        if (arr[index] < 0) {
            quantity += 1;

            return calcQuantityNegativeNumbers(arr, quantity, ++index);
        } else {
            return calcQuantityNegativeNumbers(arr, quantity, ++index);
        }
    }
}

function calcQuantityPositiveNumbers(arr, quantity, index) {
    index = index || 0;
    quantity = quantity || 0;

    if (index === arr.length) {
        return quantity;
    } else {
        if (arr[index] > 0) {
            quantity += 1;

            return calcQuantityPositiveNumbers(arr, quantity, ++index);
        } else {
            return calcQuantityPositiveNumbers(arr, quantity, ++index);
        }
    }
}

function calcQuantityPrimeNumbers(arr, quantity, indexI) {
    indexI = indexI || 0;
    quantity = quantity || 0;

    if (indexI === arr.length) {
        return quantity;
    } else {
        if (indexI < arr.length) {
            let isPrime = true;
            let number = arr[indexI];

            (function _calcQuantityPrimeNumbers(indexJ) {
                indexJ = indexJ || 2;

                if (indexJ < number) {
                    if (number % indexJ === 0) {
                        isPrime = false;
                        return;
                    } else {
                        return _calcQuantityPrimeNumbers(++indexJ);
                    }
                }
            })();

            if (isPrime && number > 1) {
                quantity += 1;

                return calcQuantityPrimeNumbers(arr, quantity, ++indexI);
            } else {
                return calcQuantityPrimeNumbers(arr, quantity, ++indexI);
            }
        }
    }
}

// Task 11 ---------

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

function convertDecimalToBinary(number, array, div) {
    div = div || number;
    array = array || [];

    array.push(div % 2);

    if (div > 1) {
        div = parseInt(div / 2);

        return convertDecimalToBinary(number, array, div);
    } else {
        array = Number(array.reverse().join(''));

        return array;
    }
}

function convertDecimalToBinary(number, array, index) {
    array = array || convertNumberToArray(number);
    index = index || 0;
    let result = 0;

    if (index < array.length) {
        const digit = array[index];

        result += digit * 2 ** (array.length - 1 - index);

        return result + convertDecimalToBinary(number, array, ++index);
    } else {
        return result;
    }
}

// Task 12 ---------
