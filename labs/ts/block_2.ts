// Task 1

// Call
interface ICall {
    [key: symbol]: Function;
}

interface Function {
    customCall<T, U>(context: T, ...args: U[]): T;
}

Function.prototype.customCall = function <T, U>(context: T, ...args: U[]): T {
    let symbol: symbol = Symbol();

    if (typeof context !== 'object') {
        const result: ICall = Object(context);

        result[symbol] = this;
        result[symbol](...args);

        return context;
    }

    const result: ICall = Object.assign({}, context, { [symbol]: this });

    result[symbol](...args);

    return context;
};

// Bind

interface IBindResult {
    [key: symbol]: Function;
}

type bindedFunc = <A>(...args: A[]) => IBindResult;

interface Function {
    customBind<T, U>(context: T, ...args: U[]): bindedFunc;
}

Function.prototype.customBind = function <T, U>(
    context: T,
    ...args: U[]
): bindedFunc {
    const func: Function = this;

    return function <A>(...args2: A[]): IBindResult {
        let symbol: symbol = Symbol();

        if (typeof context !== 'object') {
            const result: IBindResult = Object(context);

            result[symbol] = func;
            result[symbol](...args);

            return result;
        }

        const result: IBindResult = Object.assign({}, context, {
            [symbol]: func,
        });

        result[symbol](...args, ...args2);

        return result;
    };
};

// Task 2

interface IThisValue {
    [key: symbol]: Function;
}

// Map

interface Array<T> {
    customMap(callback: Function, thisValue?: IThisValue): T[];
}

Array.prototype.customMap = function <T>(
    callback: Function,
    thisValue?: IThisValue,
): T[] {
    thisValue = thisValue || undefined;

    const result: any[] = [];
    let symbol: symbol = Symbol();

    if (thisValue) {
        thisValue[symbol] = callback;
    }

    for (let i: number = 0; i < this.length; i++) {
        const currentItem: any = this[i];
        const index: number = i;

        if (thisValue) {
            result.push(thisValue[symbol](currentItem, index, this));
        } else {
            result.push(callback(currentItem, index, this));
        }
    }

    if (thisValue) {
        delete thisValue[symbol];
    }

    return result;
};

// Filter

interface Array<T> {
    customFilter(callback: Function, thisValue?: IThisValue): T[];
}

Array.prototype.customFilter = function <T>(
    callback: Function,
    thisValue?: IThisValue,
): T[] {
    thisValue = thisValue || undefined;

    const result: any[] = [];
    let symbol: symbol = Symbol();

    if (thisValue) {
        thisValue[symbol] = callback;
    }

    for (let i: number = 0; i < this.length; i++) {
        const currentItem: any = this[i];
        const index: number = i;

        if (thisValue) {
            const isValid: boolean = thisValue[symbol](
                currentItem,
                index,
                this,
            );

            if (isValid) {
                result.push(currentItem);
            }
        } else {
            const isValid: boolean = callback(currentItem, index, this);

            if (isValid) {
                result.push(currentItem);
            }
        }
    }

    if (thisValue) {
        delete thisValue[symbol];
    }

    return result;
};

// forEach
interface Array<T> {
    customForEach(callback: Function, thisValue?: IThisValue): void;
}

Array.prototype.customForEach = function (
    callback: Function,
    thisValue?: IThisValue,
): void {
    thisValue = thisValue || undefined;
    const array: any[] = [...this];
    const symbol: symbol = Symbol();

    if (thisValue) {
        thisValue[symbol] = callback;
    }

    for (let i: number = 0; i < array.length; i++) {
        const currentItem: any = array[i];
        const index: number = i;

        if (thisValue) {
            thisValue[symbol](currentItem, index, array);
        } else {
            callback(currentItem, index, array);
        }
    }

    if (thisValue) {
        delete thisValue[symbol];
    }
};

// Reduce

interface Array<T> {
    customReduce<U>(callback: Function, initialValue?: U): U;
}

Array.prototype.customReduce = function <U>(
    callback: Function,
    initialValue?: U,
): U {
    if (this.length === 0 && initialValue === undefined) {
        throw new Error('Reduce of empty this with no initial value');
    }

    let accumulator: any = initialValue ?? this[0];

    if (
        (this.length === 1 && initialValue === undefined) ||
        (initialValue && this.length === 0)
    ) {
        return accumulator;
    }

    let currentValue: any = accumulator === initialValue ? this[0] : this[1];

    for (let i: number = 0; i < this.length; i++) {
        const index: number = i;

        accumulator = callback(accumulator, currentValue, index, this);
        currentValue = this[i + 1];
    }

    return accumulator;
};

// Task 3
interface IObjOne {
    oldValue: number;
    newValue: number;
    numberIter: number;

    [Symbol.iterator](): Generator;
}

const obj: IObjOne = {
    oldValue: 0,
    newValue: 1,
    numberIter: 10,

    *[Symbol.iterator]() {
        for (let i = 0; i < this.numberIter; i++) {
            yield this.oldValue;

            this.newValue = this.oldValue + this.newValue;
            this.oldValue = this.newValue - this.oldValue;
        }
    },
};

// Solution 2

interface IObjTwo {
    oldValue: number;
    newValue: number;
    numberIter: number;

    [Symbol.iterator](): this;

    next(): IteratorResult<number>;
}

const obj2: IObjTwo = {
    oldValue: 0,
    newValue: 1,
    numberIter: 10,

    [Symbol.iterator]() {
        return this;
    },

    next() {
        this.numberIter--;

        if (this.numberIter >= 0) {
            this.newValue = this.oldValue + this.newValue;
            this.oldValue = this.newValue - this.oldValue;

            return { value: this.oldValue, done: false };
        }

        return { value: undefined, done: true };
    },
};
