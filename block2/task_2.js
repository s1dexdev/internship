'use strict';

Array.prototype.customMap = function (callback, thisValue) {
    thisValue = thisValue || undefined;
    const array = [...this];
    const result = [];
    let method = null;

    if (thisValue) {
        method = Symbol();
        thisValue[method] = callback;
    }

    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];
        const index = i;

        if (thisValue) {
            result.push(thisValue[method](currentItem, index, array));
        } else {
            result.push(callback(currentItem, index, array));
        }
    }

    if (thisValue) {
        delete thisValue[method];
    }

    return result;
};

Array.prototype.customFilter = function (callback, thisValue) {
    thisValue = thisValue || undefined;
    const array = [...this];
    const result = [];
    let method = null;

    if (thisValue) {
        method = Symbol();
        thisValue[method] = callback;
    }

    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];
        const index = i;

        if (thisValue) {
            const isValid = thisValue[method](currentItem, index, array);

            if (isValid) {
                result.push(currentItem);
            }
        } else {
            const isValid = callback(currentItem, index, array);

            if (isValid) {
                result.push(currentItem);
            }
        }
    }

    if (thisValue) {
        delete thisValue[method];
    }

    return result;
};

Array.prototype.customForEach = function (callback, thisValue) {
    thisValue = thisValue || undefined;
    const array = [...this];
    let method = null;

    if (thisValue) {
        method = Symbol();
        thisValue[method] = callback;
    }

    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];
        const index = i;

        if (thisValue) {
            thisValue[method](currentItem, index, array);
        } else {
            callback(currentItem, index, array);
        }
    }

    if (thisValue) {
        delete thisValue[method];
    }
};

Array.prototype.customReduce = function (callback, initialValue) {
    const array = this;

    if (array.length === 0 && initialValue === undefined) {
        throw new Error('Reduce of empty array with no initial value');
    }

    let accumulator = initialValue ?? array[0];

    if (
        (array.length === 1 && initialValue === undefined) ||
        (initialValue && array.length === 0)
    ) {
        return accumulator;
    }

    let currentValue = accumulator === initialValue ? array[0] : array[1];

    for (let i = 0; i < array.length; i++) {
        const index = i;

        accumulator = callback(accumulator, currentValue, index, array);
        currentValue = array[i + 1];
    }

    return accumulator;
};
