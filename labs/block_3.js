// Task 1 -----------

// class Node {
//     #value;
//     #right;
//     #left;
//     #parent;

//     constructor() {
//         this.#value = null;
//         this.#right = null;
//         this.#left = null;
//     }

//     insert(value, node) {
//         node = node || this;

//         if (node.#value === null) {
//             node.#value = value;

//             return true;
//         }

//         if (node.#value > value) {
//             if (node.#left === null) {
//                 node.#left = new Node();
//                 node.#left.#parent = node;
//             }

//             return this.insert(value, node.#left);
//         }

//         if (node.#value < value) {
//             if (node.#right === null) {
//                 node.#right = new Node();
//                 node.#right.#parent = node;
//             }

//             return this.insert(value, node.#right);
//         }
//     }

//     findByValue(value, node) {
//         node = node || this;

//         if (node.#value === value) {
//             return node;
//         }

//         if (node.#left === null && node.#right === null) {
//             return false;
//         }

//         if (node.#value > value) {
//             return this.findByValue(value, node.#left);
//         }

//         if (node.#value < value) {
//             return this.findByValue(value, node.#right);
//         }
//     }

//     remove(value) {
//         let removeElem = this.findByValue(value);

//         if (!removeElem) {
//             return false;
//         }

//         // Удаление узла без потомков
//         if (removeElem.#right === null && removeElem.#left === null) {
//             if (removeElem.#value > removeElem.#parent.#value) {
//                 removeElem.#parent.#right = null;

//                 return true;
//             }

//             removeElem.#parent.#left = null;

//             return true;
//         }

//         // Удаление узла с двумя потомками
//         if (removeElem.#right && removeElem.#left) {
//             return true;
//         }

//         // Удаление узла с одним потомком
//         if (removeElem.#right === null || removeElem.#left === null) {
//             const child = removeElem.#right ?? removeElem.#left;

//             child.#parent = removeElem.#parent;

//             if (removeElem.#value < removeElem.#parent.#value) {
//                 removeElem.#parent.#left = child;

//                 return true;
//             }

//             removeElem.#parent.#right = child;

//             return true;
//         }
//     }
// }

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

        if (removeElem.#value < node.#value) {
            if (node.#left.#value === removeElem.#value) {
                // Удаление узла без потомков
                if (removeElem.#right === null && removeElem.#left === null) {
                    node.#left = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.#right && removeElem.#left) {
                }

                // Удаление узла с одним потомком
                if (removeElem.#right === null || removeElem.#left === null) {
                    node.#left = removeElem.#left;

                    return true;
                }
            }

            return this.remove(value, node.#left);
        }

        if (removeElem.#value > node.#value) {
            if (node.#right.#value === removeElem.#value) {
                // Удаление узла без потомков
                if (removeElem.#right === null && removeElem.#right === null) {
                    node.#right = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.#right && removeElem.#left) {
                    if (removeElem.#right.#left === null) {
                        node.#right = removeElem.#left;
                        node.#right.#right = removeElem.#right;

                        return true;
                    } else {
                        return this.remove(value, removeElem.#right.#left);
                    }
                }

                // Удаление узла с одним потомком
                if (removeElem.#right === null || removeElem.#left === null) {
                    node.#right = removeElem.#right;

                    return true;
                }
            }
            return this.remove(value, node.#right);
        }
    }
}

const node = new Node();
const arr = [10, 8, 14, 12, 16, 26, 2, 1, 7, 19, 20, 28, 27, 17, 29];

arr.forEach(item => node.insert(item));

console.log(node);
// console.log(node.findByValue(0));
node.remove(28);
