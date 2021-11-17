interface Function {
    customCall<T, U>(context: T, ...args: U[]): T;
}

Function.prototype.customCall = function (context, ...args) {
    const func = this;

    (function (): void {
        context = context || this;

        if (typeof context === 'object') {
            let method: symbol = Symbol();

            context[method] = func;
            context[method](...args);

            delete context[method];
        } else {
            const result = Object(context);

            result.method = func;
            result.method(...args);
        }
    })();

    return context;
};

const obj = {
    x: 10,
};

function foo() {
    console.log(this);
}

foo.customCall(obj);

// interface K {
//     [Symbol: symbol]: Function;
// }

// interface Function {
//     customCall<T, U>(context: T & K, ...args: U[]): T;
// }

// Function.prototype.customCall = function <T, U>(
//     context: T & K,
//     ...args: U[]
// ): T {
//     let symbol: symbol = Symbol();

//     if (typeof context === 'object') {
//         context[symbol] = this;
//         context[symbol](...args);

//         delete context[symbol];
//     } else {
//         const result = Object(context);

//         result[symbol] = this;
//         result[symbol](...args);
//     }

//     return context;
// };

// type K = {
//     [Symbol: symbol]: Function;
// };

// interface Function {
//     customCall<T, U>(context: T & K, ...args: U[]): T;
// }

// Function.prototype.customCall = function <T, U>(context: T, ...args: U[]): T {
//     let symbol: symbol = Symbol();

//     let c: T = Object.assign({}, context, { symbol });
//     // let c2: T = c as T;

//     return c;
// };
