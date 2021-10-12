'use strict';

// Memo

function memo(func) {
    let cache = new Map();

    return (...args) => {
        let key = args.length + args.join('+');

        if (cache.has(key)) {
            return cache.get(key);
        } else {
            let result = func.apply(this, args);

            cache.set(key, result);

            return result;
        }
    };
}

// Task 1 ----------

const isAnagram = memo((strOne, strTwo, index) => {
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

        const _isAnagram = memo(j => {
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

                return _isAnagram(++j);
            }
        });

        _isAnagram();

        if (counter1 !== counter2) {
            return false;
        }

        return isAnagram(strOne, strTwo, ++index);
    }

    return true;
});

// Task 3 ----------

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

const calcQuantityOfDigits = memo(number => {
    const numbers = convertNumberToArray(number);
    const result = {};

    // Инициализация свойств объекта result
    const initProps = memo(j => {
        j = j || 0;

        if (j < numbers.length) {
            const digit = numbers[j];

            result[digit] = 0;
            initProps(++j);
        }
    });

    initProps();

    // Подсчет количества чисел
    const calcDigits = memo(k => {
        k = k || 0;

        if (k < numbers.length) {
            const digit = numbers[k];

            result[digit] += 1;
            calcDigits(++k);
        }
    });

    calcDigits();

    return result;
});

// Task 4 ----------

const calcQuantityUniqWords = memo(str => {
    const arrayOfWords = str.toLowerCase().split(' ');
    const uniqWords = [];

    const findUniqWord = memo(i => {
        i = i || 0;
        const word = arrayOfWords[i];
        let count = 0;

        if (i < arrayOfWords.length) {
            const calcQuantity = memo(j => {
                j = j || 0;

                if (j < arrayOfWords.length) {
                    if (word === arrayOfWords[j]) {
                        count += 1;
                    }

                    calcQuantity(++j);
                }
            });

            calcQuantity();

            if (count === 1) {
                uniqWords.push(word);
            }

            findUniqWord(++i);
        }
    });

    findUniqWord();

    return uniqWords.length;
});

// Task 5 ----------

const calcQuantityWords = memo(str => {
    const arrayOfWords = str.toLowerCase().split(' ');
    const map = new Map();
    let result = {};

    // Инициализация свойств объекта result
    const initProps = memo(i => {
        i = i || 0;

        if (i < arrayOfWords.length) {
            const word = arrayOfWords[i];

            map[word] = 0;
            initProps(++i);
        }
    });

    initProps();

    // Подсчет количества слов
    const calcWords = memo(j => {
        j = j || 0;

        if (j < arrayOfWords.length) {
            const word = arrayOfWords[j];

            map[word] += 1;
            calcWords(++j);
        }
    });

    calcWords();

    result = { ...map };

    return result;
});

// Task 6 ----------

const fibonacci = memo((number, numbersFib, index) => {
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
});

// Task 8 ----------

const factorial = memo(number => {
    if (number === 0) {
        return 1;
    } else {
        return number * factorial(number - 1);
    }
});

// Task 9 ----------

const sumMultiplyOfTwo = memo((arr, i) => {
    i = i || 0;
    let sum = 0;

    if (i < arr.length) {
        let number = arr[i];

        if (number % 2 === 0) {
            sum += number;
        }
        return sum + sumMultiplyOfTwo(arr, ++i);
    }

    return sum;
});

const sumMultiplyOfThree = memo((arr, i) => {
    i = i || 0;
    let sum = 0;

    if (i < arr.length) {
        let number = arr[i];

        if (number % 3 === 0) {
            sum += number;
        }
        return sum + sumMultiplyOfThree(arr, ++i);
    }

    return sum;
});

const sumPositiveOddNumbers = memo((arr, i) => {
    i = i || 0;
    let sum = 0;

    if (i < arr.length) {
        let number = arr[i];

        if (number > 0 && number % 2 !== 0) {
            sum += number;
        }
        return sum + sumPositiveOddNumbers(arr, ++i);
    }

    return sum;
});

// Task 10 ----------

const calcQuantityZero = memo((arr, quantity, index) => {
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
});

const calcQuantityNegativeNumbers = memo((arr, quantity, index) => {
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
});

const calcQuantityPositiveNumbers = memo((arr, quantity, index) => {
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
});

const calcQuantityPrimeNumbers = memo((arr, quantity, i) => {
    i = i || 0;
    quantity = quantity || 0;

    if (i === arr.length) {
        return quantity;
    } else {
        if (i < arr.length) {
            let isPrime = true;
            let number = arr[i];

            const _calcQuantityPrimeNumbers = memo(j => {
                j = j || 2;

                if (j < number) {
                    if (number % j === 0) {
                        isPrime = false;
                        return;
                    } else {
                        return _calcQuantityPrimeNumbers(++j);
                    }
                }
            });

            _calcQuantityPrimeNumbers();

            if (isPrime && number > 1) {
                quantity += 1;

                return calcQuantityPrimeNumbers(arr, quantity, ++i);
            } else {
                return calcQuantityPrimeNumbers(arr, quantity, ++i);
            }
        }
    }
});

// Task 11 ----------

const convertDecimalToBinary = memo((number, array, div) => {
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
});

const convertBinaryToDecimal = memo((number, array, index) => {
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
});

// Task 12 ----------

const calcSumMultiplyOfTwo = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let sum = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number % 2 === 0) {
                sum += number;
            }

            return sum + calcSumMultiplyOfTwo(arr, i, ++j);
        }
        return sum + calcSumMultiplyOfTwo(arr, ++i);
    }

    return sum;
});

const calcSumMultiplyOfThree = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let sum = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number % 3 === 0) {
                sum += number;
            }

            return sum + calcSumMultiplyOfThree(arr, i, ++j);
        }
        return sum + calcSumMultiplyOfThree(arr, ++i);
    }

    return sum;
});

const calcSumPositiveOddNumbers = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let sum = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number > 0 && number % 2 !== 0) {
                sum += number;
            }

            return sum + calcSumPositiveOddNumbers(arr, i, ++j);
        }
        return sum + calcSumPositiveOddNumbers(arr, ++i);
    }

    return sum;
});

const calcQuantityZeros = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let quantity = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number === 0) {
                quantity += 1;
            }

            return quantity + calcQuantityZeros(arr, i, ++j);
        }
        return quantity + calcQuantityZeros(arr, ++i);
    }

    return quantity;
});

const calcQuantityNegativeNum = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let quantity = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number < 0) {
                quantity += 1;
            }

            return quantity + calcQuantityNegativeNum(arr, i, ++j);
        }
        return quantity + calcQuantityNegativeNum(arr, ++i);
    }

    return quantity;
});

const calcQuantityPositiveNum = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;
    let quantity = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let number = arr[i][j];

            if (number > 0) {
                quantity += 1;
            }

            return quantity + calcQuantityPositiveNum(arr, i, ++j);
        }
        return quantity + calcQuantityPositiveNum(arr, ++i);
    }

    return quantity;
});

const calcQuantityPrimeNum = memo((arr, i, j) => {
    i = i || 0;
    j = j || 0;

    let quantity = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let isPrime = true;
            let number = arr[i][j];

            const _calcQuantityPrimeNum = memo(k => {
                k = k || 2;

                if (k < number) {
                    if (number % k === 0) {
                        isPrime = false;
                        return;
                    }

                    _calcQuantityPrimeNum(++k);
                }
            });

            _calcQuantityPrimeNum();

            if (isPrime && number > 1) {
                quantity += 1;

                return quantity + calcQuantityPrimeNumbers(arr, i, ++j);
            } else {
                return quantity + calcQuantityPrimeNumbers(arr, i, ++j);
            }
        }

        return quantity + calcQuantityPrimeNumbers(arr, ++i);
    }
    return quantity;
});

// Task 13 ---------

const sumElem = memo((min, max, index) => {
    index = index || min;
    let sum = 0;

    if (index <= max) {
        sum += index;

        return sum + sumElem(min, max, ++index);
    }

    return sum;
});

const sumElemMultiplyOfThree = memo((min, max, index) => {
    index = index || min;

    let sum = 0;

    if (index <= max) {
        if (index % 3 === 0) {
            sum += index;
        }

        return sum + sumElemMultiplyOfThree(min, max, ++index);
    }

    return sum;
});

// Task 14 ---------

const calcMeanValue = memo((arr, index) => {
    index = index || 0;
    const arrayOfNumbers = arr.flat();
    let result = 0;
    let sum = 0;

    if (index < arrayOfNumbers.length) {
        const number = arrayOfNumbers[index];

        sum += number;

        return sum + calcMeanValue(arr, ++index);
    }

    result = parseInt(sum / arrayOfNumbers.length);

    return result;
});

// Task 15 ---------

const matrixTranspotion = memo((matrix, matrixT, i, j, k) => {
    i = i || 0;
    j = j || 0;
    k = k || 0;

    matrixT = matrixT || [];

    if (i < matrix.length) {
        matrixT.push([]);

        return matrixTranspotion(matrix, matrixT, ++i);
    }

    if (j < matrix.length && i === matrix.length) {
        if (k < matrix[j].length) {
            matrixT[k].push(matrix[j][k]);

            return matrixTranspotion(matrix, matrixT, i, j, ++k);
        }
        return matrixTranspotion(matrix, matrixT, i, ++j);
    }

    return matrixT;
});

// Task 16 ---------

const matrixAddition = memo((matrix1, matrix2, result, i, j, k) => {
    i = i || 0;
    j = j || 0;
    k = k || 0;
    result = result || [];

    if (i < matrix1.length) {
        result.push([]);

        return matrixAddition(matrix1, matrix2, result, ++i);
    }

    if (j < matrix1.length && i === matrix1.length) {
        if (k < matrix1[j].length) {
            const number = matrix1[j][k] + matrix2[j][k];

            result[j].push(number);

            return matrixAddition(matrix1, matrix2, result, i, j, ++k);
        }
        return matrixAddition(matrix1, matrix2, result, i, ++j);
    }

    return result;
});

// Task 17 ---------

const deleteRowWithZero = memo((array, result, indexes, i, j) => {
    result = result || array;
    indexes = indexes || [];
    i = i || 0;
    j = j || 0;

    if (i < array.length) {
        if (array[i].includes(0)) {
            const index = i;

            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
        return deleteRowWithZero(array, result, indexes, ++i);
    }

    if (j === 0 && i === array.length) {
        indexes.reverse();
    }

    if (j < indexes.length && i >= array.length) {
        result.splice(indexes[j], 1);

        return deleteRowWithZero(array, result, indexes, i, ++j);
    }

    return result;
});

const deleteColumnWithZero = memo((array, result, indexes, i, j, k, l) => {
    result = result || array;
    indexes = indexes || [];
    i = i || 0;
    j = j || 0;
    k = k || 0;
    l = l || 0;

    if (i < array.length) {
        if (j < array[i].length) {
            if (array[j][i] === 0) {
                const index = i;

                if (!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
            return deleteColumnWithZero(array, result, indexes, i, ++j);
        }
        return deleteColumnWithZero(array, result, indexes, ++i);
    }

    if (k < indexes.length && i === array.length) {
        if (k === 0 && l === 0) {
            indexes.reverse();
        }
        if (l < array.length) {
            result[l].splice(indexes[k], 1);

            return deleteColumnWithZero(array, result, indexes, i, j, k, ++l);
        }
        return deleteColumnWithZero(array, result, indexes, i, j, ++k);
    }

    return result;
});
