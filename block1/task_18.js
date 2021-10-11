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

    (function _sumMultiplyOfTwo(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number % 2 === 0) {
                sum += number;
            }

            _sumMultiplyOfTwo(++i);
        }
    })();

    return sum;
}

function sumMultiplyOfThree(arr) {
    let sum = 0;

    (function _sumMultiplyOfThree(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number % 3 === 0) {
                sum += number;
            }

            _sumMultiplyOfThree(++i);
        }
    })();

    return sum;
}

function sumPositiveOddNumbers(arr) {
    let sum = 0;

    (function _sumPositiveOddNumbers(i) {
        i = i || 0;

        if (i < arr.length) {
            let number = arr[i];

            if (number > 0 && number % 2 !== 0) {
                sum += number;
            }

            _sumPositiveOddNumbers(++i);
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

function calcSumMultiplyOfTwo(arr, indexI) {
    indexI = indexI || 0;
    let sum = 0;

    if (indexI < arr.length) {
        (function _calcSumMultiplyOfTwo(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number % 2 === 0) {
                    sum += number;

                    _calcSumMultiplyOfTwo(++indexJ);
                } else {
                    _calcSumMultiplyOfTwo(++indexJ);
                }
            }
        })();

        return sum + calcSumMultiplyOfTwo(arr, ++indexI);
    }

    return sum;
}

function calcSumMultiplyOfThree(arr, indexI) {
    indexI = indexI || 0;
    let sum = 0;

    if (indexI < arr.length) {
        (function _calcSumMultiplyOfThree(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number % 3 === 0) {
                    sum += number;

                    _calcSumMultiplyOfThree(++indexJ);
                } else {
                    _calcSumMultiplyOfThree(++indexJ);
                }
            }
        })();

        return sum + calcSumMultiplyOfThree(arr, ++indexI);
    }

    return sum;
}

function calcSumPositiveOddNumbers(arr, indexI) {
    indexI = indexI || 0;
    let sum = 0;

    if (indexI < arr.length) {
        (function _calcSumPositiveOddNumbers(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number > 0 && number % 2 !== 0) {
                    sum += number;

                    _calcSumPositiveOddNumbers(++indexJ);
                } else {
                    _calcSumPositiveOddNumbers(++indexJ);
                }
            }
        })();

        return sum + calcSumPositiveOddNumbers(arr, ++indexI);
    }

    return sum;
}

function calcQuantityZero(arr, indexI) {
    indexI = indexI || 0;
    let quantity = 0;

    if (indexI < arr.length) {
        (function _calcQuantityZero(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number === 0) {
                    quantity += 1;

                    _calcQuantityZero(++indexJ);
                } else {
                    _calcQuantityZero(++indexJ);
                }
            }
        })();

        return quantity + calcQuantityZero(arr, ++indexI);
    }

    return quantity;
}

function calcQuantityNegativeNumbers(arr, indexI) {
    indexI = indexI || 0;
    let quantity = 0;

    if (indexI < arr.length) {
        (function _calcQuantityNegativeNumbers(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number < 0) {
                    quantity += 1;

                    _calcQuantityNegativeNumbers(++indexJ);
                } else {
                    _calcQuantityNegativeNumbers(++indexJ);
                }
            }
        })();

        return quantity + calcQuantityNegativeNumbers(arr, ++indexI);
    }

    return quantity;
}

function calcQuantityPositiveNumbers(arr, indexI) {
    indexI = indexI || 0;
    let quantity = 0;

    if (indexI < arr.length) {
        (function _calcQuantityPositiveNumbers(indexJ) {
            indexJ = indexJ || 0;

            if (indexJ < arr[indexI].length) {
                let number = arr[indexI][indexJ];

                if (number > 0) {
                    quantity += 1;

                    _calcQuantityPositiveNumbers(++indexJ);
                } else {
                    _calcQuantityPositiveNumbers(++indexJ);
                }
            }
        })();

        return quantity + calcQuantityPositiveNumbers(arr, ++indexI);
    }

    return quantity;
}

function calcQuantityPrimeNumbers(arr, i, j) {
    i = i || 0;
    j = j || 0;

    let quantity = 0;

    if (i < arr.length) {
        if (j < arr[i].length) {
            let isPrime = true;
            let number = arr[i][j];

            (function _calcQuantityPrimeNumbers(k) {
                k = k || 2;

                if (k < number) {
                    if (number % k === 0) {
                        isPrime = false;
                        return;
                    }

                    _calcQuantityPrimeNumbers(++k);
                }
            })();

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
}

// Task 13 ---------

function sumElem(min, max, index) {
    index = index || min;
    let sum = 0;

    if (index <= max) {
        sum += index;

        return sum + sumElem(min, max, ++index);
    }

    return sum;
}

function sumElemMultiplyOfThree(min, max, index) {
    index = index || min;

    let sum = 0;

    if (index <= max) {
        if (index % 3 === 0) {
            sum += index;
        }

        return sum + sumElemMultiplyOfThree(min, max, ++index);
    }

    return sum;
}

// Task 14 ---------

function calcMeanValue(arr, index) {
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
}

// Task 15 ---------

function matrixTranspotion(matrix, matrixT, i, j, k) {
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
}

// Task 16 ---------

function matrixAddition(matrix1, matrix2, result, i, j, k) {
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
}

// Task 17 ---------

function deleteRowWithZero(array, result, indexes, i, j) {
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
}

function deleteColumnWithZero(array, result, indexes, i, j, k, l) {
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
}
