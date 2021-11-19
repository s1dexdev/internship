// Task 1

function isAnagram(strOne: string, strTwo: string): boolean {
    const wordOne: string = strOne.toLowerCase().trim();
    const wordTwo: string = strTwo.toLowerCase().trim();

    if (wordOne.length !== wordTwo.length) {
        return false;
    }

    for (let i: number = 0; i < wordOne.length; i++) {
        let counter1: number = 0;
        let counter2: number = 0;
        let letterOne: string = wordOne[i];

        for (let j: number = 0; j < wordOne.length; j++) {
            let letterTwo: string = wordOne[j];

            if (letterOne === letterTwo) {
                counter1++;
            }

            letterTwo = wordTwo[j];

            if (letterOne === letterTwo) {
                counter2++;
            }
        }

        if (counter1 !== counter2) {
            return false;
        }
    }

    return true;
}

// Task 2

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

interface IResult {
    [key: number]: number;
}

function calcQuantityDigits(number: number): IResult {
    const numbers: number[] = convertNumberToArray(number);
    const result: IResult = {};

    for (let i: number = 0; i < numbers.length; i++) {
        result[numbers[i]] = 3;
    }

    for (let i: number = 0; i < numbers.length; i++) {
        result[numbers[i]]++;
    }

    return result;
}

// Task 4

function calcQuantityUniqWords(str: string): number {
    const arrayOfWords: string[] = str.toLowerCase().split(' ');
    const uniqWords: string[] = [];

    for (let i: number = 0; i < arrayOfWords.length; i++) {
        let count: number = 0;

        for (let j: number = 0; j < arrayOfWords.length; j++) {
            if (arrayOfWords[i] === arrayOfWords[j]) {
                count++;
            }
        }

        if (count === 1) {
            uniqWords.push(arrayOfWords[i]);
        }
    }

    return uniqWords.length;
}

// Task 5

interface IResult {
    [key: string]: number;
}

function calcQuantityWords(str: string): IResult {
    const arrayOfWords: string[] = str.toLowerCase().split(' ');
    let result: IResult = {};

    for (let i: number = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]] = 0;
    }

    for (let i: number = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]]++;
    }

    return result;
}

// Task 6

function fibonacci(number: number): number[] {
    if (number === 0) {
        return [];
    }

    const numbersFibonacci: number[] = [0, 1];

    for (let i: number = 0; i < number - 1; i++) {
        let fib: number = numbersFibonacci[i] + numbersFibonacci[i + 1];

        numbersFibonacci.push(fib);
    }

    return numbersFibonacci;
}

// Task 7

abstract class Figure {
    abstract perimeter(): number; 
    abstract area(): number;
}

// Rectangle

class Rectangle extends Figure {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super();

        this.width = width;
        this.height = height;
    }

    public perimeter(): number {
        return 2 * (this.width + this.height);
    }

    public area(): number {
        return this.width * this.height;
    }
}

//Triangle

class Triangle extends Figure {
    private sideA: number;
    private sideB: number;
    private sideC: number;

    constructor(sideA: number, sideB: number, sideC: number) {
        super();

        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    public perimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }

    public area(): number {
        const semiPerimeter: number = this.perimeter() / 2;

        return Math.sqrt(
            semiPerimeter *
                ((semiPerimeter - this.sideA) *
                    (semiPerimeter - this.sideB) *
                    (semiPerimeter - this.sideC)),
        );
    }
}

// Circle

class Circle extends Figure {
    private radius: number;

    constructor(radius: number) {
        super();

        this.radius = radius;
    }

    public perimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    public area(): number {
        return Math.PI * this.radius ** 2;
    }
}

function getMaxPerimFigure(arr:Figure[]): Figure {
    let result: Figure = arr[0];

    for(let i: number = 0; i < arr.length; i++) {
        if(arr[i].perimeter() > result.perimeter()) {
            result = arr[i];
        }
    }

    return result;
}


// Task 8
function factorial(number: number): number {
    let factorial: number = 1;

    if (number <= 1) {
        return factorial;
    }

    for (let i: number = 0; i < number; i++) {
        factorial *= number - i;
    }

    return factorial;
}

// Task 9

function calcSumElems(arr: number[], callback: Function): number {
    let sum: number = 0;

    for (let i: number = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            sum += arr[i];
        }
    }

    return sum;
}

// Task 10

function getQuantityDigits(
    arr: number[],
    callback: Function,
    isFlag: boolean,
): number {
    isFlag = isFlag || false;

    let quantity: number = 0;

    for (let i: number = 0; i < arr.length; i++) {
        let isPrime: boolean = true;

        if (isFlag) {
            for (let j: number = 2; j < arr[i]; j++) {
                if (arr[i] % j === 0) {
                    isPrime = false;

                    break;
                }
            }
        }

        if (callback(arr[i], isPrime)) {
            quantity++;
        }
    }

    return quantity;
}

// Task 11

function convertDecimalToBinary(value: number): number {
    let number: number = value;
    let result: number[] = [];

    while (number >= 1) {
        result.push(number % 2);
        number = Math.floor(number / 2);
    }

    return Number(result.reverse().join(''));
}

function convertBinaryToDecimal(value: number): number {
    const numbers: number[] = convertNumberToArray(value);
    let result: number = 0;

    for (let i: number = 0; i < numbers.length; i++) {
        result += numbers[i] * 2 ** (numbers.length - 1 - i);
    }

    return result;
}

// Task 12

function calcSumDigitsArr(arr: number[][], callback: Function): number {
    let sum: number = 0;

    for (let i: number = 0; i < arr.length; i++) {
        for (let j: number = 0; j < arr[i].length; j++) {
            let number: number = arr[i][j];

            if (callback(number)) {
                sum += number;
            }
        }
    }

    return sum;
}

function calcQuantityDigitsArr(
    arr: number[][],
    callback: Function,
    isFlag: boolean,
): number {
    isFlag = isFlag || false;
    let quantity: number = 0;

    for (let i: number = 0; i < arr.length; i++) {
        for (let j: number = 0; j < arr[i].length; j++) {
            let isPrime: boolean = true;
            let number: number = arr[i][j];

            if (isFlag) {
                for (let k: number = 2; k < number; k++) {
                    if (number % k === 0) {
                        isPrime = false;

                        break;
                    }
                }
            }

            if (callback(number, isPrime)) {
                quantity++;
            }
        }
    }

    return quantity;
}

// Task 13

function getSumElems(min: number, max: number, callback: Function): number {
    let sum: number = 0;

    for (let i: number = min; i <= max; i++) {
        if (callback(i)) {
            sum += i;
        }
    }

    return sum;
}

// Task 14

function calcMeanValue(arr: number[][]): number {
    const arrayOfNumbers: number[] = arr.flat();
    let result: number = 0;
    let sum: number = 0;

    for (let i: number = 0; i < arrayOfNumbers.length; i++) {
        sum += arrayOfNumbers[i];
    }

    result = Math.floor(sum / arrayOfNumbers.length);

    return result;
}

// Task 15

function matrixTranspotion(matrix: number[][]): number[][] {
    const matrixT: number[][] = [];

    for (let i: number = 0; i < matrix.length; i++) {
        matrixT.push([]);
    }

    for (let i: number = 0; i < matrix.length; i++) {
        for (let j: number = 0; j < matrix[i].length; j++) {
            matrixT[j].push(matrix[i][j]);
        }
    }

    return matrixT;
}

// Task 16

function matrixAddition(matrix1: number[][], matrix2: number[][]): number[][] {
    const result: number[][] = [];

    for (let i: number = 0; i < matrix1.length; i++) {
        result.push([]);
    }

    for (let i: number = 0; i < matrix1.length; i++) {
        for (let j: number = 0; j < matrix1[i].length; j++) {
            const number: number = matrix1[i][j] + matrix2[i][j];

            result[i].push(number);
        }
    }

    return result;
}

// Task 17

function deleteRowWithValue(array: number[][], value: number) {
    value = value || 0;
    let result: number[][] = array;
    let indexes: number[] = [];

    for (let i: number = 0; i < array.length; i++) {
        if (array[i].includes(value)) {
            const index: number = i;

            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
    }

    indexes.reverse();

    for (let j: number = 0; j < indexes.length; j++) {
        result.splice(indexes[j], 1);
    }

    return result;
}

function deleteColumnWithValue(array: number[][], value: number) {
    value = value || 0;
    const result: number[][] = array;
    let indexes: number[] = [];

    for (let i: number = 0; i < array.length; i++) {
        for (let j: number = 0; j < array[i].length; j++) {
            if (array[j][i] === value) {
                const index = i;

                if (!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
        }
    }

    indexes.reverse();

    for (let i: number = 0; i < indexes.length; i++) {
        for (let j: number = 0; j < array.length; j++) {
            result[j].splice(indexes[i], 1);
        }
    }

    return result;
}
