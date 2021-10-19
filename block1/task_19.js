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

    return (strOne, strTwo, indexI, counter1, counter2, indexJ) => {
        const key = [strOne, strTwo].join('');
        let result = memo[key];

        if (result === undefined) {
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const wordOne = strOne.toLowerCase().trim();
            const wordTwo = strTwo.toLowerCase().trim();

            if (wordOne.length !== wordTwo.length) {
                result = false;
                memo[key] = result;

                return result;
            }

            if (indexI < wordOne.length) {
                counter1 = counter1 || 0;
                counter2 = counter2 || 0;

                let letterOne = wordOne[indexI];

                if (indexJ < wordOne.length) {
                    let letterTwo = wordOne[indexJ];

                    if (letterOne === letterTwo) {
                        counter1++;
                    }

                    letterTwo = wordTwo[indexJ];

                    if (letterOne === letterTwo) {
                        counter2++;
                    }

                    return memoAnagram(
                        strOne,
                        strTwo,
                        indexI,
                        counter1,
                        counter2,
                        ++indexJ,
                    );
                }

                if (counter1 !== counter2) {
                    result = false;
                    memo[key] = result;

                    return result;
                }

                return memoAnagram(
                    strOne,
                    strTwo,
                    ++indexI,
                    counter1,
                    counter2,
                );
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

    return (number, calcResult, indexI, indexJ) => {
        const key = number;
        let result = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const numbers = convertNumberToArray(number);

            // Инициализация свойств объекта calcResult
            if (indexI < numbers.length && indexJ === 0) {
                calcResult[numbers[indexI]] = 0;

                return memoCalcQuantityDigigtsInNumber(
                    number,
                    calcResult,
                    ++indexI,
                    indexJ,
                );
            }

            // Подсчет количества чисел
            if (indexJ < numbers.length && indexI === numbers.length) {
                calcResult[numbers[indexJ]]++;

                return memoCalcQuantityDigigtsInNumber(
                    number,
                    calcResult,
                    indexI,
                    ++indexJ,
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

    return (str, uniqWords, indexI, indexJ, count) => {
        const key = str.toLowerCase().trim();
        let result = memo[key];

        if (result === undefined) {
            uniqWords = uniqWords || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const arrayOfWords = str.toLowerCase().split(' ');

            if (indexI < arrayOfWords.length) {
                const word = arrayOfWords[indexI];

                count = count || 0;

                if (indexJ < arrayOfWords.length) {
                    if (word === arrayOfWords[indexJ]) {
                        count++;
                    }

                    return memoCalcQuantityUniqWords(
                        str,
                        uniqWords,
                        indexI,
                        ++indexJ,
                        count,
                    );
                }

                if (count === 1) {
                    uniqWords.push(word);
                }
                return memoCalcQuantityUniqWords(str, uniqWords, ++indexI);
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

    return (str, calcResult, indexI, indexJ) => {
        const key = str.toLowerCase().trim();
        let result = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const arrayOfWords = str.toLowerCase().split(' ');

            // Инициализация свойств объекта calcResult
            if (indexI < arrayOfWords.length && indexJ === 0) {
                calcResult[arrayOfWords[indexI]] = 0;

                return memoCalcQuantityWords(str, calcResult, ++indexI);
            }

            if (
                indexJ < arrayOfWords.length &&
                indexI === arrayOfWords.length
            ) {
                const word = arrayOfWords[indexJ];

                if (word in memo) {
                    return word;
                }

                calcResult[word]++;

                return memoCalcQuantityWords(str, calcResult, indexI, ++indexJ);
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

    return (number, numbersFib, indexI) => {
        let key = number;
        let result = memo[key];

        if (number <= 0) {
            return [];
        }

        if (result === undefined) {
            numbersFib = numbersFib || [0, 1];
            indexI = indexI || 0;

            if (indexI < number - 1) {
                let fib = numbersFib[indexI] + numbersFib[indexI + 1];

                memo[indexI + 1] = [...numbersFib]; //Мемоизация вычислений для чисел < number
                numbersFib.push(fib);
                result = memoFibonacci(number, numbersFib, ++indexI);
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

    return (arr, indexI) => {
        let key = arr.join('');
        let result = memo[key];

        if (result === undefined) {
            indexI = indexI || 0;

            const arrayOfNumbers = arr.flat();
            let resultNum = 0;
            let sum = 0;

            if (indexI < arrayOfNumbers.length) {
                const number = arrayOfNumbers[indexI];

                sum += number;

                result = sum + memoCalcMeanValue(arr, ++indexI);
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

    return (matrix, matrixT, indexI, indexJ, indexK) => {
        let key = matrix.join('');
        let result = memo[key];

        if (result === undefined) {
            matrixT = matrixT || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;
            indexK = indexK || 0;

            if (indexI < matrix.length) {
                matrixT.push([]);

                return memoMatrixTranspotion(matrix, matrixT, ++indexI);
            }

            if (indexJ < matrix.length && indexI === matrix.length) {
                if (indexK < matrix[indexJ].length) {
                    matrixT[indexK].push(matrix[indexJ][indexK]);

                    return memoMatrixTranspotion(
                        matrix,
                        matrixT,
                        indexI,
                        indexJ,
                        ++indexK,
                    );
                }
                return memoMatrixTranspotion(matrix, matrixT, indexI, ++indexJ);
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

    return (matrix1, matrix2, resultMatrix, indexI, indexJ, indexK) => {
        let key = matrix1.join('') + matrix2.join('');
        let result = memo[key];

        if (result === undefined) {
            resultMatrix = resultMatrix || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;
            indexK = indexK || 0;

            if (indexI < matrix1.length) {
                resultMatrix.push([]);

                return memoMatrixAddition(
                    matrix1,
                    matrix2,
                    resultMatrix,
                    ++indexI,
                );
            }

            if (indexJ < matrix1.length && indexI === matrix1.length) {
                if (indexK < matrix1[indexJ].length) {
                    const number =
                        matrix1[indexJ][indexK] + matrix2[indexJ][indexK];

                    resultMatrix[indexJ].push(number);

                    return memoMatrixAddition(
                        matrix1,
                        matrix2,
                        resultMatrix,
                        indexI,
                        indexJ,
                        ++indexK,
                    );
                }
                return memoMatrixAddition(
                    matrix1,
                    matrix2,
                    resultMatrix,
                    indexI,
                    ++indexJ,
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

    return (array, resultArray, indexes, indexI, indexJ) => {
        let key = array.join('');
        let result = memo[key];

        if (result === undefined) {
            resultArray = resultArray || cloneArray(array);
            indexes = indexes || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            if (indexI < array.length) {
                if (array[indexI].includes(0)) {
                    const index = indexI;

                    if (!indexes.includes(index)) {
                        indexes.push(index);
                    }
                }
                return memoDeleteRowWithZero(
                    array,
                    resultArray,
                    indexes,
                    ++indexI,
                );
            }

            if (indexJ === 0 && indexI === array.length) {
                indexes.reverse();
            }

            if (indexJ < indexes.length && indexI >= array.length) {
                resultArray.splice(indexes[indexJ], 1);

                return memoDeleteRowWithZero(
                    array,
                    resultArray,
                    indexes,
                    indexI,
                    ++indexJ,
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

    return (array, resultArray, indexes, indexI, indexJ, indexK, indexL) => {
        let key = array.join('');
        let result = memo[key];

        if (result === undefined) {
            resultArray = resultArray || cloneArray(array);
            indexes = indexes || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;
            indexK = indexK || 0;
            indexL = indexL || 0;

            if (indexI < resultArray.length) {
                if (indexJ < resultArray[indexI].length) {
                    if (resultArray[indexJ][indexI] === 0) {
                        const index = indexI;

                        if (!indexes.includes(index)) {
                            indexes.push(index);
                        }
                    }

                    return memoDeleteColumnWithZero(
                        array,
                        resultArray,
                        indexes,
                        indexI,
                        ++indexJ,
                    );
                }

                return memoDeleteColumnWithZero(
                    array,
                    resultArray,
                    indexes,
                    ++indexI,
                );
            }

            if (indexK < indexes.length && indexI === resultArray.length) {
                if (indexK === 0 && indexL === 0) {
                    indexes.reverse();
                }
                if (indexL < resultArray.length) {
                    resultArray[indexL].splice(indexes[indexK], 1);

                    return memoDeleteColumnWithZero(
                        array,
                        resultArray,
                        indexes,
                        indexI,
                        indexJ,
                        indexK,
                        ++indexL,
                    );
                }
                return memoDeleteColumnWithZero(
                    array,
                    resultArray,
                    indexes,
                    indexI,
                    indexJ,
                    ++indexK,
                );
            }

            result = resultArray;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();
