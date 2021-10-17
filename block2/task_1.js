'use strict';

Function.prototype.customCall = function (context, ...args) {
    const func = this;

    (function () {
        context = context || this;

        if (typeof context === 'object') {
            let method = Symbol();

            context[method] = func;
            context[method](...args);

            delete context[method];
        } else {
            const result = Object(context);

            result.method = func;
            result.method(...args);
        }
    })();
};