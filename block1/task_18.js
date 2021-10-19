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

function isAnagram(strOne, strTwo, indexI, counter1, counter2, indexJ) {
    indexI = indexI || 0;
    indexJ = indexJ || 0;

    const wordOne = strOne.toLowerCase().trim();
    const wordTwo = strTwo.toLowerCase().trim();

    if (wordOne.length !== wordTwo.length) {
        return false;
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

            return isAnagram(
                strOne,
                strTwo,
                indexI,
                counter1,
                counter2,
                ++indexJ,
            );
        }

        if (counter1 !== counter2) {
            return false;
        }

        return isAnagram(strOne, strTwo, ++indexI, counter1, counter2);
    }

    return true;
}

// Task 3 ---------

function calcQuantityDigigtsInNumber(number, result, indexI, indexJ) {
    result = result || {};
    indexI = indexI || 0;
    indexJ = indexJ || 0;

    const numbers = convertNumberToArray(number);

    // Инициализация свойств объекта result
    if (indexI < numbers.length && indexJ === 0) {
        result[numbers[indexI]] = 0;

        return calcQuantityDigigtsInNumber(number, result, ++indexI, indexJ);
    }

    // Подсчет количества чисел
    if (indexJ < numbers.length && indexI === numbers.length) {
        result[numbers[indexJ]]++;

        return calcQuantityDigigtsInNumber(number, result, indexI, ++indexJ);
    }

    return result;
}

// Task 4 ---------

function calcQuantityUniqWords(str, uniqWords, indexI, indexJ, count) {
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

            return calcQuantityUniqWords(
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
        return calcQuantityUniqWords(str, uniqWords, ++indexI);
    }

    return uniqWords.length;
}

// Task 5 ---------

function calcQuantityWords(str, result, indexI, indexJ) {
    result = result || {};
    indexI = indexI || 0;
    indexJ = indexJ || 0;

    const arrayOfWords = str.toLowerCase().split(' ');

    // Инициализация свойств объекта result
    if (indexI < arrayOfWords.length && indexJ === 0) {
        result[arrayOfWords[indexI]] = 0;

        return calcQuantityWords(str, result, ++indexI);
    }

    if (indexJ < arrayOfWords.length && indexI === arrayOfWords.length) {
        result[arrayOfWords[indexJ]]++;

        return calcQuantityWords(str, result, indexI, ++indexJ);
    }

    return result;
}

// Task 6 ---------

function fibonacci(number, numbersFib, indexI) {
    indexI = indexI || 0;
    numbersFib = numbersFib || [0, 1];

    if (number <= 0) {
        return [];
    } else {
        if (indexI < number - 1) {
            let fib = numbersFib[indexI] + numbersFib[indexI + 1];

            numbersFib.push(fib);

            return fibonacci(number, numbersFib, ++indexI);
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

function calcSumElems(arr, callback, indexI) {
    indexI = indexI || 0;
    let sum = 0;

    if (indexI < arr.length) {
        let number = arr[indexI];

        if (callback(number)) {
            sum += number;
        }
        return sum + calcSumElems(arr, callback, ++indexI);
    }

    return sum;
}

// calcSumElems(array, number => true); // Сумма всех элементов массива
// calcSumElems(array, number => number % 2); // Сумма элементов массива кратных двум
// calcSumElems(array, number => number % 3); // Сумма элементов массива кратных трем
// calcSumElems(array, number => number > 0 && number % 2 !== 0); // Сумма элементов массива положительных и нечетных

// Task 10 ---------

function calcQuantityDigits(arr, callback, isFlag, indexI) {
    isFlag = isFlag || false; //Флаг на проверку простых чисел
    indexI = indexI || 0;

    let quantity = 0;

    if (indexI < arr.length) {
        let isPrime = true;
        let number = arr[indexI];

        if (isFlag) {
            (function isPrimeNumber(j) {
                j = j || 2;

                if (j < number) {
                    if (number % j === 0) {
                        isPrime = false;

                        return;
                    }

                    isPrimeNumber(++j);
                }
            })();
        }

        if (callback(number, isPrime)) {
            quantity++;
        }

        return quantity + calcQuantityDigits(arr, callback, isFlag, ++indexI);
    }

    return quantity;
}

// calcQuantityDigits(array, (number, isPrime) => isPrime && number > 1, true); //Количество простых чисел в массиве
// calcQuantityDigits(array, number => number === 0); //Количество нулей в массиве
// calcQuantityDigits(array, number => number < 0); //Количество отрицательных элементов в массиве
// calcQuantityDigits(array, number => number > 0); //Количество положительных элементов в массиве

// Task 11 ---------

function convertDecimalToBinary(number, array, div) {
    div = div || number;
    array = array || [];

    array.push(div % 2);

    if (div > 1) {
        div = parseInt(div / 2);

        return convertDecimalToBinary(number, array, div);
    }
    array = Number(array.reverse().join(''));

    return array;
}

function convertBinaryToDecimal(number, array, indexI) {
    array = array || convertNumberToArray(number);
    indexI = indexI || 0;
    let result = 0;

    if (indexI < array.length) {
        const digit = array[indexI];

        result += digit * 2 ** (array.length - 1 - indexI);

        return result + convertBinaryToDecimal(number, array, ++indexI);
    }
    return result;
}

// Task 12 ---------

function calcSumNumbers(arr, callback, indexI, indexJ) {
    indexI = indexI || 0;
    indexJ = indexJ || 0;
    let sum = 0;

    if (indexI < arr.length) {
        if (indexJ < arr[indexI].length) {
            let number = arr[indexI][indexJ];

            if (callback(number)) {
                sum += number;
            }

            return sum + calcSumNumbers(arr, callback, indexI, ++indexJ);
        }
        return sum + calcSumNumbers(arr, callback, ++indexI);
    }

    return sum;
}

function calcQuantityNumbers(arr, callback, isFlag, indexI, indexJ) {
    isFlag = isFlag || false; //Флаг на проверку простых чисел
    indexI = indexI || 0;
    indexJ = indexJ || 0;
    let quantity = 0;

    if (indexI < arr.length) {
        if (indexJ < arr[indexI].length) {
            let number = arr[indexI][indexJ];

            if (isFlag) {
                (function isPrimeNumber(k) {
                    k = k || 2;

                    if (k < number) {
                        if (number % k === 0) {
                            isPrime = false;

                            return;
                        }

                        isPrimeNumber(++k);
                    }
                })();
            }

            if (callback(number)) {
                quantity++;
            }

            return (
                quantity +
                calcQuantityNumbers(arr, callback, isFlag, indexI, ++indexJ)
            );
        }
        return quantity + calcQuantityNumbers(arr, callback, isFlag, ++indexI);
    }

    return quantity;
}

// Сумма элементов
// calcSumNumbers(array, number => true); // Сумма всех элементов массива
// calcSumNumbers(array, number => number % 2); // Сумма элементов массива кратных двум
// calcSumNumbers(array, number => number % 3); // Сумма элементов массива кратных трем
// calcSumNumbers(array, number => number > 0 && number % 2 !== 0); // Сумма элементов массива положительных и нечетных

// Количество элементов
// calcQuantityNumbers(array, number => number === 0); //Количество нулей в массиве
// calcQuantityNumbers(array, number => number < 0); //Количество отрицательных элементов в массиве
// calcQuantityNumbers(array, number => number > 0); //Количество положительных элементов в массиве
// calcQuantityNumbers(array, (number, isPrime) => isPrime && number > 1, true); //Количество простых чисел в массиве

// Task 13 ---------

function calcSumElem(min, max, callback, indexI) {
    indexI = indexI || min;
    let sum = 0;

    if (indexI <= max) {
        if (callback(indexI)) {
            sum += indexI;
        }

        return sum + calcSumElem(min, max, callback, ++indexI);
    }

    return sum;
}

// calcSumElem(-5, 20, item => item % 3 === 0); //Сумма чисел кратных трем в диапазоне от min до max
// calcSumElem(-5, 20, item => item > 0); //Сумма положительных чисел в диапазоне от min до max
// calcSumElem(-5, 20, item => true); //Сумма всех чисел в диапазоне от min до max

// Task 14 ---------

function calcMeanValue(arr, indexI) {
    indexI = indexI || 0;
    const arrayOfNumbers = arr.flat();
    let result = 0;
    let sum = 0;

    if (indexI < arrayOfNumbers.length) {
        const number = arrayOfNumbers[indexI];

        sum += number;

        return sum + calcMeanValue(arr, ++indexI);
    }

    result = parseInt(sum / arrayOfNumbers.length);

    return result;
}

// Task 15 ---------

function matrixTranspotion(matrix, matrixT, indexI, indexJ, indexK) {
    indexI = indexI || 0;
    indexJ = indexJ || 0;
    indexK = indexK || 0;

    matrixT = matrixT || [];

    if (indexI < matrix.length) {
        matrixT.push([]);

        return matrixTranspotion(matrix, matrixT, ++indexI);
    }

    if (indexJ < matrix.length && indexI === matrix.length) {
        if (indexK < matrix[indexJ].length) {
            matrixT[indexK].push(matrix[indexJ][indexK]);

            return matrixTranspotion(matrix, matrixT, indexI, indexJ, ++indexK);
        }
        return matrixTranspotion(matrix, matrixT, indexI, ++indexJ);
    }

    return matrixT;
}

// Task 16 ---------

function matrixAddition(matrix1, matrix2, result, indexI, indexJ, indexK) {
    indexI = indexI || 0;
    indexJ = indexJ || 0;
    indexK = indexK || 0;
    result = result || [];

    if (indexI < matrix1.length) {
        result.push([]);

        return matrixAddition(matrix1, matrix2, result, ++indexI);
    }

    if (indexJ < matrix1.length && indexI === matrix1.length) {
        if (indexK < matrix1[indexJ].length) {
            const number = matrix1[indexJ][indexK] + matrix2[indexJ][indexK];

            result[indexJ].push(number);

            return matrixAddition(
                matrix1,
                matrix2,
                result,
                indexI,
                indexJ,
                ++indexK,
            );
        }
        return matrixAddition(matrix1, matrix2, result, indexI, ++indexJ);
    }

    return result;
}

// Task 17 ---------

function deleteRowWithValue(array, value, result, indexes, indexI, indexJ) {
    value = value || 0;
    result = result || cloneArray(array);
    indexes = indexes || [];
    indexI = indexI || 0;
    indexJ = indexJ || 0;

    if (indexI < array.length) {
        if (array[indexI].includes(value)) {
            const index = indexI;

            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
        return deleteRowWithValue(array, value, result, indexes, ++indexI);
    }

    if (indexJ === 0 && indexI === array.length) {
        indexes.reverse();
    }

    if (indexJ < indexes.length && indexI >= array.length) {
        result.splice(indexes[indexJ], 1);

        return deleteRowWithValue(
            array,
            value,
            result,
            indexes,
            indexI,
            ++indexJ,
        );
    }

    return result;
}

function deleteColumnWithValue(
    array,
    value,
    result,
    indexes,
    indexI,
    indexJ,
    indexK,
    indexL,
) {
    value = value || 0;
    result = result || cloneArray(array);
    indexes = indexes || [];
    indexI = indexI || 0;
    indexJ = indexJ || 0;
    indexK = indexK || 0;
    indexL = indexL || 0;

    if (indexI < array.length) {
        if (indexJ < array[indexI].length) {
            if (array[indexJ][indexI] === value) {
                const index = indexI;

                if (!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
            return deleteColumnWithValue(
                array,
                value,
                result,
                indexes,
                indexI,
                ++indexJ,
            );
        }
        return deleteColumnWithValue(array, value, result, indexes, ++indexI);
    }

    if (indexK < indexes.length && indexI === array.length) {
        if (indexK === 0 && indexL === 0) {
            indexes.reverse();
        }
        if (indexL < array.length) {
            result[indexL].splice(indexes[indexK], 1);

            return deleteColumnWithValue(
                array,
                value,
                result,
                indexes,
                indexI,
                indexJ,
                indexK,
                ++indexL,
            );
        }
        return deleteColumnWithValue(
            array,
            value,
            result,
            indexes,
            indexI,
            indexJ,
            ++indexK,
        );
    }

    return result;
}
