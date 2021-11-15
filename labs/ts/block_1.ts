// Task 1

function isAnagram(strOne: string, strTwo: string): boolean {
    const wordOne: string = strOne.toLowerCase().trim();
    const wordTwo: string = strTwo.toLowerCase().trim();

    if (wordOne.length !== wordTwo.length) {
        return false;
    }

    for (let i = 0; i < wordOne.length; i++) {
        let counter1: number = 0;
        let counter2: number = 0;
        let letterOne = wordOne[i];

        for (let j = 0; j < wordOne.length; j++) {
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

//  Преобразование числа в массив цифр
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

// Подсчет количества чисел
interface IResult {
    [key: number]: number;
}

function calcQuantityDigits(number: number):IResult {
    const numbers: number[] = convertNumberToArray(number);
    const result: IResult = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < numbers.length; i++) {
        result[numbers[i]] = 3;
    }

    // Подсчет количества чисел
    for (let i = 0; i < numbers.length; i++) {
        result[numbers[i]]++;
    }

    return result;
}

// Task 4

function calcQuantityUniqWords(str:string):number {
    const arrayOfWords:string[] = str.toLowerCase().split(' ');
    const uniqWords:string[] = [];

    for (let i = 0; i < arrayOfWords.length; i++) {
        let count:number = 0;

        for (let j = 0; j < arrayOfWords.length; j++) {
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
    [key: string]:number
}

function calcQuantityWords(str:string):IResult {
    const arrayOfWords:string[] = str.toLowerCase().split(' ');
    let result:IResult = {};

    // Инициализация свойств объекта result
    for (let i = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]] = 0;
    }

    // Подсчет количества слов
    for (let i = 0; i < arrayOfWords.length; i++) {
        result[arrayOfWords[i]]++;
    }

    return result;
}

// Task 6

function fibonacci(number:number):number[] {
    if (number === 0) {
        return [];
    }

    const numbersFibonacci:number[] = [0, 1];

    for (let i = 0; i < number - 1; i++) {
        let fib:number = numbersFibonacci[i] + numbersFibonacci[i + 1];

        numbersFibonacci.push(fib);
    }

    return numbersFibonacci;
}

// Task 7

class Rectangle {
    private width:number;
    private height:number;

    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
    }

    get perimeter():number {
        return 2 * (this.width + this.height);
    }

    get area():number {
        return this.width * this.height;
    }
}

//Triangle

class Triangle {
    private sideA:number;
    private sideB:number;
    private sideC:number;

    constructor(sideA:number, sideB:number, sideC:number) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    get perimeter():number {
        return this.sideA + this.sideB + this.sideC;
    }

    get area():number {
        const semiPerimeter:number = this.perimeter / 2;

        return Math.sqrt(
            semiPerimeter *
                ((semiPerimeter - this.sideA) *
                    (semiPerimeter - this.sideB) *
                    (semiPerimeter - this.sideC)),
        );
    }
}

// Circle

class Circle {
    private radius:number;

    constructor(radius:number) {
        this.radius = radius;
    }

    get perimeter():number {
        return 2 * Math.PI * this.radius;
    }

    get area():number {
        return Math.PI * this.radius ** 2;
    }
}

// Task 8

function factorial(number:number):number {
    let factorial:number = 1;

    if (number <= 1) {
        return factorial;
    }

    for (let i = 0; i < number; i++) {
        factorial *= number - i;
    }

    return factorial;
}

// Task 9