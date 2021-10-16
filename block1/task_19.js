'use strict';

//  Преобразование числа в массив цифр
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

// Функция для копирования двумерных массивов
function cloneArray(arr) {
    const newArray = [];

    for (let item of arr) {
        if (Array.isArray(item)) {
            let newItem = [...item];

            newArray.push(newItem);
        } else {
            newArray.push(item);
        }
    }

    return newArray;
}

// Task 1 ---------

const memoAnagram = (() => {
    let memo = {};

    return (strOne, strTwo, i, counter1, counter2, j) => {
        const key = [strOne, strTwo].join('');
        let result = memo[key];

        if (result === undefined) {
            i = i || 0;
            j = j || 0;

            const wordOne = strOne.toLowerCase().trim();
            const wordTwo = strTwo.toLowerCase().trim();

            if (wordOne.length !== wordTwo.length) {
                result = false;
                memo[key] = result;

                return result;
            }

            if (i < wordOne.length) {
                counter1 = counter1 || 0;
                counter2 = counter2 || 0;

                let letterOne = wordOne[i];

                if (j < wordOne.length) {
                    let letterTwo = wordOne[j];

                    if (letterOne === letterTwo) {
                        counter1++;
                    }

                    letterTwo = wordTwo[j];

                    if (letterOne === letterTwo) {
                        counter2++;
                    }

                    return memoAnagram(
                        strOne,
                        strTwo,
                        i,
                        counter1,
                        counter2,
                        ++j,
                    );
                }

                if (counter1 !== counter2) {
                    result = false;
                    memo[key] = result;

                    return result;
                }

                return memoAnagram(strOne, strTwo, ++i, counter1, counter2);
            }

            result = true;
            memo[key] = result;

            return result;
        }
        return result;
    };
})();

// Task 3 ---------

const memoCalcQuantityDigigtsInNumber = (() => {
    let memo = {};

    return (number, calcResult, i, j) => {
        const key = number;
        let result = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            i = i || 0;
            j = j || 0;

            const numbers = convertNumberToArray(number);

            // Инициализация свойств объекта calcResult
            if (i < numbers.length && j === 0) {
                const digit = numbers[i];

                calcResult[digit] = 0;

                return memoCalcQuantityDigigtsInNumber(
                    number,
                    calcResult,
                    ++i,
                    j,
                );
            }

            // Подсчет количества чисел
            if (j < numbers.length && i === numbers.length) {
                const digit = numbers[j];

                calcResult[digit]++;

                return memoCalcQuantityDigigtsInNumber(
                    number,
                    calcResult,
                    i,
                    ++j,
                );
            }

            result = calcResult;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

// Task 4 ---------

const memoCalcQuantityUniqWords = (() => {
    let memo = {};

    return (str, uniqWords, i, j, count) => {
        const key = str.toLowerCase().trim();
        let result = memo[key];

        if (result === undefined) {
            uniqWords = uniqWords || [];
            i = i || 0;
            j = j || 0;

            const arrayOfWords = str.toLowerCase().split(' ');

            if (i < arrayOfWords.length) {
                const word = arrayOfWords[i];

                count = count || 0;

                if (j < arrayOfWords.length) {
                    if (word === arrayOfWords[j]) {
                        count++;
                    }

                    return memoCalcQuantityUniqWords(
                        str,
                        uniqWords,
                        i,
                        ++j,
                        count,
                    );
                }

                if (count === 1) {
                    uniqWords.push(word);
                }
                return memoCalcQuantityUniqWords(str, uniqWords, ++i);
            }

            result = uniqWords.length;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

// Task 5 ---------

const memoCalcQuantityWords = (() => {
    let memo = {};

    return (str, calcResult, i, j) => {
        const key = str.toLowerCase().trim();
        let result = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            i = i || 0;
            j = j || 0;

            const arrayOfWords = str.toLowerCase().split(' ');

            // Инициализация свойств объекта calcResult
            if (i < arrayOfWords.length && j === 0) {
                const word = arrayOfWords[i];

                calcResult[word] = 0;

                return memoCalcQuantityWords(str, calcResult, ++i);
            }

            if (j < arrayOfWords.length && i === arrayOfWords.length) {
                const word = arrayOfWords[j];

                if (word in memo) {
                    return word;
                }

                calcResult[word]++;

                return memoCalcQuantityWords(str, calcResult, i, ++j);
            }

            result = calcResult;
            memo[key] = result;

            return result;
        }
        return result;
    };
})();

// Task 6 ---------

const memoFibonacci = (() => {
    let memo = {};

    return (number, numbersFib, i) => {
        let key = number;
        let result = memo[key];

        if (number <= 0) {
            return [];
        }

        if (result === undefined) {
            numbersFib = numbersFib || [0, 1];
            i = i || 0;

            if (i < number - 1) {
                let fib = numbersFib[i] + numbersFib[i + 1];

                memo[i + 1] = [...numbersFib]; //Мемоизация вычислений для чисел < number
                numbersFib.push(fib);
                result = memoFibonacci(number, numbersFib, ++i);
                memo[key] = result;
            }

            return numbersFib;
        }

        return result;
    };
})();

// Task 8 ---------

const memoFactorial = (() => {
    let memo = {};

    return number => {
        let key = number;
        let result = memo[key];

        if (number === 0) {
            return 1;
        }

        if (result === undefined) {
            result = memoFactorial(number - 1);
            memo[key] = result;
        }

        return number * result;
    };
})();

// Task 11 ---------

const memoConvertDecimalToBinary = (() => {
    let memo = {};

    return (number, array, div) => {
        let key = number;
        let result = memo[key];

        if (result === undefined) {
            div = div || number;
            array = array || [];
            array.push(div % 2);

            if (div > 1) {
                div = parseInt(div / 2);

                return memoConvertDecimalToBinary(number, array, div);
            } else {
                array = Number(array.reverse().join(''));

                result = array;
                memo[key] = result;

                return result;
            }
        }

        return result;
    };
})();

const memoConvertBinaryToDecimal = (() => {
    let memo = {};

    return (number, array, index) => {
        let key = number;
        let result = memo[key];

        if (result === undefined) {
            array = array || convertNumberToArray(number);
            index = index || 0;

            let resultNum = 0;

            if (index < array.length) {
                const digit = array[index];

                resultNum += digit * 2 ** (array.length - 1 - index);
                result =
                    resultNum +
                    memoConvertBinaryToDecimal(number, array, ++index);
                memo[key] = result;

                return result;
            }

            result = resultNum;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

// Task 14 ---------

const memoCalcMeanValue = (() => {
    let memo = {};

    return (arr, i) => {
        let key = arr.join('');
        let result = memo[key];

        if (result === undefined) {
            i = i || 0;

            const arrayOfNumbers = arr.flat();
            let resultNum = 0;
            let sum = 0;

            if (i < arrayOfNumbers.length) {
                const number = arrayOfNumbers[i];

                sum += number;

                result = sum + memoCalcMeanValue(arr, ++i);
                memo[key] = result;

                return result;
            }

            resultNum = parseInt(sum / arrayOfNumbers.length);
            result = resultNum;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

// Task 15 ---------

const memoMatrixTranspotion = (() => {
    let memo = {};

    return (matrix, matrixT, i, j, k) => {
        let key = matrix.join('');
        let result = memo[key];

        if (result === undefined) {
            matrixT = matrixT || [];
            i = i || 0;
            j = j || 0;
            k = k || 0;

            if (i < matrix.length) {
                matrixT.push([]);

                return memoMatrixTranspotion(matrix, matrixT, ++i);
            }

            if (j < matrix.length && i === matrix.length) {
                if (k < matrix[j].length) {
                    matrixT[k].push(matrix[j][k]);

                    return memoMatrixTranspotion(matrix, matrixT, i, j, ++k);
                }
                return memoMatrixTranspotion(matrix, matrixT, i, ++j);
            }

            result = matrixT;
            memo[key] = result;

            return result;
        }
        return result;
    };
})();

// Task 16 ---------

const memoMatrixAddition = (() => {
    let memo = {};

    return (matrix1, matrix2, resultMatrix, i, j, k) => {
        let key = matrix1.join('') + matrix2.join('');
        let result = memo[key];

        if (result === undefined) {
            resultMatrix = resultMatrix || [];
            i = i || 0;
            j = j || 0;
            k = k || 0;

            if (i < matrix1.length) {
                resultMatrix.push([]);

                return memoMatrixAddition(matrix1, matrix2, resultMatrix, ++i);
            }

            if (j < matrix1.length && i === matrix1.length) {
                if (k < matrix1[j].length) {
                    const number = matrix1[j][k] + matrix2[j][k];

                    resultMatrix[j].push(number);

                    return memoMatrixAddition(
                        matrix1,
                        matrix2,
                        resultMatrix,
                        i,
                        j,
                        ++k,
                    );
                }
                return memoMatrixAddition(
                    matrix1,
                    matrix2,
                    resultMatrix,
                    i,
                    ++j,
                );
            }
            result = resultMatrix;
            memo[key] = result;

            return result;
        }
        return result;
    };
})();

// Task 17 ---------

const memoDeleteRowWithZero = (() => {
    let memo = {};

    return (array, resultArray, indexes, i, j) => {
        let key = array.join('');
        let result = memo[key];

        if (result === undefined) {
            resultArray = resultArray || cloneArray(array);
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
                return memoDeleteRowWithZero(array, resultArray, indexes, ++i);
            }

            if (j === 0 && i === array.length) {
                indexes.reverse();
            }

            if (j < indexes.length && i >= array.length) {
                resultArray.splice(indexes[j], 1);

                return memoDeleteRowWithZero(
                    array,
                    resultArray,
                    indexes,
                    i,
                    ++j,
                );
            }
            result = resultArray;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

const memoDeleteColumnWithZero = (() => {
    let memo = {};

    return (array, resultArray, indexes, i, j, k, l) => {
        let key = array.join('');
        let result = memo[key];

        if (result === undefined) {
            resultArray = resultArray || cloneArray(array);
            indexes = indexes || [];
            i = i || 0;
            j = j || 0;
            k = k || 0;
            l = l || 0;

            if (i < resultArray.length) {
                if (j < resultArray[i].length) {
                    if (resultArray[j][i] === 0) {
                        const index = i;

                        if (!indexes.includes(index)) {
                            indexes.push(index);
                        }
                    }

                    return memoDeleteColumnWithZero(
                        array,
                        resultArray,
                        indexes,
                        i,
                        ++j,
                    );
                }

                return memoDeleteColumnWithZero(
                    array,
                    resultArray,
                    indexes,
                    ++i,
                );
            }

            if (k < indexes.length && i === resultArray.length) {
                if (k === 0 && l === 0) {
                    indexes.reverse();
                }
                if (l < resultArray.length) {
                    resultArray[l].splice(indexes[k], 1);

                    return memoDeleteColumnWithZero(
                        array,
                        resultArray,
                        indexes,
                        i,
                        j,
                        k,
                        ++l,
                    );
                }
                return memoDeleteColumnWithZero(
                    array,
                    resultArray,
                    indexes,
                    i,
                    j,
                    ++k,
                );
            }

            result = resultArray;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();
