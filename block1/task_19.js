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

// Task 1 ---------
function isAnagram() {
    let cache = {};

    return function _isAnagram(strOne, strTwo, i, counter1, counter2, j) {
        const key = [strOne, strTwo].join('');

        let result = cache[key];

        if (result === undefined) {
            i = i || 0;
            j = j || 0;

            const wordOne = strOne.toLowerCase().trim();
            const wordTwo = strTwo.toLowerCase().trim();

            if (wordOne.length !== wordTwo.length) {
                result = false;
                cache[key] = result;

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

                    return _isAnagram(
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
                    cache[key] = result;

                    return result;
                }

                return _isAnagram(strOne, strTwo, ++i, counter1, counter2);
            }

            result = true;
            cache[key] = result;

            return result;
        }
        return result;
    };
}

// Task 3 ---------
function calcQuantityDigigtsInNumber() {
    let cache = {};

    return function _calcQuantityDigigtsInNumber(number, calcResult, i, j) {
        const key = number;
        let result = cache[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            i = i || 0;
            j = j || 0;

            const numbers = convertNumberToArray(number);

            // Инициализация свойств объекта calcResult
            if (i < numbers.length && j === 0) {
                const digit = numbers[i];

                calcResult[digit] = 0;

                return _calcQuantityDigigtsInNumber(number, calcResult, ++i, j);
            }

            // Подсчет количества чисел
            if (j < numbers.length && i === numbers.length) {
                const digit = numbers[j];

                calcResult[digit]++;

                return _calcQuantityDigigtsInNumber(number, calcResult, i, ++j);
            }

            result = calcResult;
            cache[key] = result;

            return result;
        }

        return result;
    };
}

// Task 4 ---------
function calcQuantityUniqWords() {
    let cache = {};

    return function _calcQuantityUniqWords(str, uniqWords, i, j, count) {
        const key = str.toLowerCase().trim();
        let result = cache[key];

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

                    return _calcQuantityUniqWords(
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
                return _calcQuantityUniqWords(str, uniqWords, ++i);
            }

            result = uniqWords.length;
            cache[key] = result;

            return result;
        }

        return result;
    };
}

// Task 5 ---------

function calcQuantityWords() {
    let cache = {};

    return function _calcQuantityWords(str, calcResult, i, j) {
        const key = str.toLowerCase().trim();
        let result = cache[key];

        if (result === undefined) {
            calcResult = calcResult || {};
            i = i || 0;
            j = j || 0;

            const arrayOfWords = str.toLowerCase().split(' ');

            // Инициализация свойств объекта calcResult
            if (i < arrayOfWords.length && j === 0) {
                const word = arrayOfWords[i];

                calcResult[word] = 0;

                return _calcQuantityWords(str, calcResult, ++i);
            }

            if (j < arrayOfWords.length && i === arrayOfWords.length) {
                const word = arrayOfWords[j];

                calcResult[word]++;

                return _calcQuantityWords(str, calcResult, i, ++j);
            }

            result = calcResult;
            cache[key] = result;

            return result;
        }

        return result;
    };
}

// Task 6 ---------

// Task 8 ---------

function factorial() {
    let cache = {};

    return function _factorial(number) {
        let key = number;
        let result = cache[key];

        if (number === 0) {
            return 1;
        }

        if (result === undefined) {
            result = _factorial(number - 1);
            cache[key] = result;
        }

        return number * result;
    };
}
