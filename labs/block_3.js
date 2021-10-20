// Task 1 -----------

class Node {
    #value;
    #right;
    #left;
    #parent;

    constructor() {
        this.#value = null;
        this.#right = null;
        this.#left = null;
        this.#parent = null;
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
                node.#left.#parent = node;
            }

            return this.insert(value, node.#left);
        }

        if (node.#value < value) {
            if (node.#right === null) {
                node.#right = new Node();
                node.#right.#parent = node;
            }

            return this.insert(value, node.#right);
        }
    }

    findByValue(value, node) {
        node = node || this;

        if (node.#value === value) {
            return node;
        }

        if (node.#left === null && node.#right === null) {
            return false;
        }

        if (node.#value > value) {
            return this.findByValue(value, node.#left);
        }

        if (node.#value < value) {
            return this.findByValue(value, node.#right);
        }
    }

    remove(value) {
        let removeElem = this.findByValue(value);

        if (!removeElem) {
            return false;
        }

        // Удаление узла без потомков
        if (removeElem.#right === null && removeElem.#left === null) {
            if (removeElem.#value > removeElem.#parent.#value) {
                removeElem.#parent.#right = null;

                return true;
            }

            removeElem.#parent.#left = null;

            return true;
        }

        // Удаление узла с двумя потомками
        if (removeElem.#right && removeElem.#left) {
            console.log('2');
            return true;
        }

        // Удаление узла с одним потомком
        if (removeElem.#right === null || removeElem.#left === null) {
            const child = removeElem.#right ?? removeElem.#left;

            child.#parent = removeElem.#parent;

            if (removeElem.#value < removeElem.#parent.#value) {
                removeElem.#parent.#left = child;

                return true;
            }

            removeElem.#parent.#right = child;

            return true;
        }
    }
}

const node = new Node();
const arr = [10, 8, 14, 12, 16, 2, 1, 7, 27, 19, 28, 17, 29];

arr.forEach(item => node.insert(item));

node.remove(28);
// node.remove(1);
console.log(node);
