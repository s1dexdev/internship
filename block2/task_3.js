'use strict';

// Solution 1 -----------

const obj = {
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

// for (let item of obj) {
// // console.log(item)
// }

// Solution 2 -----------

// const obj = {
//     oldValue: 0,
//     newValue: 1,
//     numberIter: 10,

//     [Symbol.iterator]() {
//         return this;
//     },

//     next() {
//         this.numberIter--;

//         if (this.numberIter >= 0) {
//             this.newValue = this.oldValue + this.newValue;
//             this.oldValue = this.newValue - this.oldValue;

//             return { value: this.oldValue, done: false };
//         }

//         return { value: this.oldValue, done: true };
//     },
// };

// for (let item of obj) {
//     console.log(item);
// }
