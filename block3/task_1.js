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

    findByValue() {}

    delete() {}
}

const node = new Node();
