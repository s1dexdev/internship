// Task 1 -----------

class Node {
    #value;
    #right;
    #left;

    constructor() {
        this.#value = null;
        this.#right = null;
        this.#left = null;
    }

    insert(value, node) {
        node = node || this;

        if (node.#value === null) {
            node.#value = value;

            return true;
        }

        if (node.#value > value) {
            if (node.#left === null) {
                node.#left = new Node();
            }

            return this.insert(value, node.#left);
        }

        if (node.#value < value) {
            if (node.#right === null) {
                node.#right = new Node();
            }

            return this.insert(value, node.#right);
        }
    }

    findByValue(value, node) {
        node = node || this;

        if (node.#value === value) {
            return node;
        }

        if (node.#value > value) {
            if (node.#left === null) {
                return false;
            }
            return this.findByValue(value, node.#left);
        }

        if (node.#value < value) {
            if (node.#right === null) {
                return false;
            }

            return this.findByValue(value, node.#right);
        }
    }

    remove(value, node) {
        node = node || this;
        let removeElem = this.findByValue(value);

        if (removeElem === null) {
            return false;
        }

        if (removeElem.#value > node.#value) {
            if (removeElem.#value === node.#right.#value) {
                // Удаление узла без потомков
                if (removeElem.#right === null && removeElem.#left === null) {
                    node.#right = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.#right && removeElem.#left) {
                    let minValue = this.findMinValue(removeElem.#right.#left);

                    this.remove(minValue.#value);
                    node.#right.#value = minValue.#value;

                    return true;
                }

                // Удаление узла с одним потомком
                if (removeElem.#right === null || removeElem.#left === null) {
                    node.#right = removeElem.#right;

                    return true;
                }
            }

            return this.remove(value, node.#right);
        }

        if (removeElem.#value < node.#value) {
            if (removeElem.#value === node.#left.#value) {
                // Удаление узла без потомков
                if (removeElem.#right === null && removeElem.#left === null) {
                    node.#left = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.#right && removeElem.#left) {
                    let minValue = this.findMinValue(removeElem.#right.#left);

                    this.remove(minValue.#value);
                    node.#left.#value = minValue.#value;

                    return true;
                }

                // Удаление узла с одним потомком
                if (removeElem.#right === null || removeElem.#left === null) {
                    node.#left = removeElem.#left;

                    return true;
                }
            }

            return this.remove(value, node.#left);
        }
    }

    findMinValue(node) {
        node = node || this;

        if (node.#left === null && node.#right === null) {
            return node;
        }

        return this.findMinValue(node.#left);
    }
}

// const node = new Node();
const arr = [10, 8, 14, 12, 16, 15, 26, 2, 1, 7, 6, 19, 20, 28, 27, 17, 29];

// arr.forEach(item => node.insert(item));

// Task 2 -----------

function sortBubble(arr) {
    const array = [...arr];

    for (let i = 0; i < array.length; i++) {
        for (let j = 0, k = 1; k < array.length; j++, k++) {
            let tempValue = null;

            if (array[j] > array[k]) {
                tempValue = array[j];
                array[j] = array[k];
                array[k] = tempValue;
            }
        }
    }

    return array;
}

function sortSelection(arr) {
    const array = [...arr];

    for (let i = array.length - 1; i >= 0; i--) {
        let maxValue = array[0];
        let tempValue = null;

        for (let j = 1; j < i + 1; j++) {
            if (array[j] > maxValue) {
                maxValue = array[j];
            }
        }

        tempValue = array[i];
        array[i] = maxValue;
        array[array.indexOf(maxValue)] = tempValue;
    }

    return array;
}
