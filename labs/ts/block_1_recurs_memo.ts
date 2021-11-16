function convertNumberToArray(number: number): number[] {
    const arr: number[] = [];
    let code: number = number;

    while (code > 0) {
        arr.push(code % 10);

        code = Math.floor(code / 10);
    }
    arr.reverse();

    return arr;
}

function cloneArray(arr: number[][]): number[][] {
    const newArray: number[][] = [];

    for (let item of arr) {
        if (Array.isArray(item)) {
            let newItem: number[] = [...item];

            newArray.push(newItem);
        } else {
            newArray.push(item);
        }
    }

    return newArray;
}

// Task 1 ---------

type anagram = (
    strOne: string,
    strTwo: string,
    indexI: number,
    counter1: number,
    counter2: number,
    indexJ?: number,
) => boolean;

interface IMemoAnagram {
    [key: string]: boolean;
}

const memoAnagram: anagram = ((): anagram => {
    let memo: IMemoAnagram = {};

    return (strOne, strTwo, indexI, counter1, counter2, indexJ) => {
        const key: string = [strOne, strTwo].join('');
        let result: boolean = memo[key];

        if (result === undefined) {
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const wordOne: string = strOne.toLowerCase().trim();
            const wordTwo: string = strTwo.toLowerCase().trim();

            if (wordOne.length !== wordTwo.length) {
                result = false;
                memo[key] = result;

                return result;
            }

            if (indexI < wordOne.length) {
                counter1 = counter1 || 0;
                counter2 = counter2 || 0;

                let letterOne: string = wordOne[indexI];

                if (indexJ < wordOne.length) {
                    let letterTwo: string = wordOne[indexJ];

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

interface ICalcResult {
    [key: number]: number;
}

interface IMemoQuantityDigits {
    [key: string]: ICalcResult;
}

type quantityDigits = (
    number: number,
    calcResult: ICalcResult,
    indexI: number,
    indexJ: number,
) => ICalcResult;

const memoCalcQuantityDigigtsInNumber: quantityDigits = ((): quantityDigits => {
    let memo: IMemoQuantityDigits = {};

    return (number, calcResult, indexI, indexJ) => {
        const key: number = number;
        let result: ICalcResult = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const numbers: number[] = convertNumberToArray(number);

            if (indexI < numbers.length && indexJ === 0) {
                calcResult[numbers[indexI]] = 0;

                return memoCalcQuantityDigigtsInNumber(
                    number,
                    calcResult,
                    ++indexI,
                    indexJ,
                );
            }

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

// Task 4

interface IMemoUniqWords {
    [key: string]: number;
}
type uniqWords = (
    str: string,
    uniqWords: string[],
    indexI: number,
    indexJ?: number,
    count?: number,
) => number;

const memoCalcQuantityUniqWords: uniqWords = ((): uniqWords => {
    let memo: IMemoUniqWords = {};

    return (str, uniqWords, indexI, indexJ, count) => {
        const key: string = str.toLowerCase().trim();
        let result: number = memo[key];

        if (result === undefined) {
            uniqWords = uniqWords || [];
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const arrayOfWords: string[] = str.toLowerCase().split(' ');

            if (indexI < arrayOfWords.length) {
                count = count || 0;

                if (indexJ < arrayOfWords.length) {
                    if (arrayOfWords[indexI] === arrayOfWords[indexJ]) {
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
                    uniqWords.push(arrayOfWords[indexI]);
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

// Task 5

interface IResultQuantityWords {
    [key: string]: number;
}

interface IMemoQuantityWords {
    [key: string]: IResultQuantityWords;
}

type quantityWords = (
    str: string,
    calcResult: IResultQuantityWords,
    indexI: number,
    indexJ?: number,
) => IResultQuantityWords;

const memoCalcQuantityWords: quantityWords = ((): quantityWords => {
    let memo: IMemoQuantityWords = {};

    return (str, calcResult, indexI, indexJ) => {
        const key: string = str.toLowerCase().trim();
        let result: IResultQuantityWords = memo[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            indexI = indexI || 0;
            indexJ = indexJ || 0;

            const arrayOfWords: string[] = str.toLowerCase().split(' ');

            if (indexI < arrayOfWords.length && indexJ === 0) {
                calcResult[arrayOfWords[indexI]] = 0;

                return memoCalcQuantityWords(str, calcResult, ++indexI);
            }

            if (
                indexJ < arrayOfWords.length &&
                indexI === arrayOfWords.length
            ) {
                const word: string = arrayOfWords[indexJ];

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

// Task 6

interface IMemoFib {
    [key: number]: number[];
}

type fibonacci = (
    number: number,
    numbersFib: number[],
    indexI: number,
) => number[];

const memoFibonacci: fibonacci = ((): fibonacci => {
    let memo: IMemoFib = {};

    return (number, numbersFib, indexI) => {
        let key: number = number;
        let result: number[] = memo[key];

        if (number <= 0) {
            return [];
        }

        if (result === undefined) {
            numbersFib = numbersFib || [0, 1];
            indexI = indexI || 0;

            if (indexI < number - 1) {
                let fib: number = numbersFib[indexI] + numbersFib[indexI + 1];

                memo[indexI + 1] = [...numbersFib];
                numbersFib.push(fib);
                result = memoFibonacci(number, numbersFib, ++indexI);
                memo[key] = result;
            }

            return numbersFib;
        }

        return result;
    };
})();

// Task 8

interface IMemoFactorial {
    [key: number]: number;
}

type factorial = (number: number) => number;

const memoFactorial: factorial = ((): factorial => {
    let memo: IMemoFactorial = {};

    return number => {
        let key: number = number;
        let result: number = memo[key];

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

// Task 11

interface IMemoNotation {
    [key: number]: number;
}

type decimalToBinary = (number: number, array: number[], div: number) => number;

const memoConvertDecimalToBinary: decimalToBinary = ((): decimalToBinary => {
    let memo: IMemoNotation = {};

    return (number, array, div) => {
        let key: number = number;
        let result: number = memo[key];

        if (result === undefined) {
            div = div || number;
            array = array || [];
            array.push(div % 2);

            if (div > 1) {
                div = Math.floor(div / 2);

                return memoConvertDecimalToBinary(number, array, div);
            }

            result = Number(array.reverse().join(''));
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

type binaryToDecimal = (
    number: number,
    array: number[],
    index: number,
) => number;

const memoConvertBinaryToDecimal: binaryToDecimal = ((): binaryToDecimal => {
    let memo: IMemoNotation = {};

    return (number, array, index) => {
        let key: number = number;
        let result: number = memo[key];

        if (result === undefined) {
            array = array || convertNumberToArray(number);
            index = index || 0;

            let resultNum: number = 0;

            if (index < array.length) {
                resultNum += array[index] * 2 ** (array.length - 1 - index);
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

// Task 14

type meanValue = (arr: number[][], indexI: number) => number;

interface IMemoMeanValue {
    [key: string]: number;
}

const memoCalcMeanValue: meanValue = ((): meanValue => {
    let memo: IMemoMeanValue = {};

    return (arr, indexI) => {
        let key: string = arr.join('');
        let result: number = memo[key];

        if (result === undefined) {
            indexI = indexI || 0;

            const arrayOfNumbers: number[] = arr.flat();
            let resultNum: number = 0;
            let sum: number = 0;

            if (indexI < arrayOfNumbers.length) {
                sum += arrayOfNumbers[indexI];

                result = sum + memoCalcMeanValue(arr, ++indexI);
                memo[key] = result;

                return result;
            }

            resultNum = Math.floor(sum / arrayOfNumbers.length);
            result = resultNum;
            memo[key] = result;

            return result;
        }

        return result;
    };
})();

// Task 15

type matrixTranspotion = (
    matrix: number[][],
    matrixT: number[][],
    indexI: number,
    indexJ?: number,
    indexK?: number,
) => number[][];

interface IMemoMatrix {
    [key: string]: number[][];
}

const memoMatrixTranspotion: matrixTranspotion = ((): matrixTranspotion => {
    let memo: IMemoMatrix = {};

    return (matrix, matrixT, indexI, indexJ, indexK) => {
        let key: string = matrix.join('');
        let result: number[][] = memo[key];

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

// Task 16

type matrixAddition = (
    matrix1: number[][],
    matrix2: number[][],
    resultMatrix: number[][],
    indexI: number,
    indexJ?: number,
    indexK?: number,
) => number[][];

const memoMatrixAddition: matrixAddition = ((): matrixAddition => {
    let memo: IMemoMatrix = {};

    return (matrix1, matrix2, resultMatrix, indexI, indexJ, indexK) => {
        let key: string = matrix1.join('') + matrix2.join('');
        let result: number[][] = memo[key];

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
                    const number: number =
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
