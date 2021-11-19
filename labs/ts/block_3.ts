// Task 1

interface INode {
    value: any;
    right: INode | null;
    left: INode | null;

    insert<T>(value: T, node?: INode): boolean;

    findByValue<T>(value: T, node?: INode): INode | boolean;

    remove<T>(value: T, node?: INode): boolean;

    findMinValue(node: INode): INode;
}

class Root implements INode {
    value: any;
    right: INode | null;
    left: INode | null;

    constructor() {
        this.value = null;
        this.right = null;
        this.left = null;
    }

    insert<T>(value: T, node?: INode): boolean {
        node = node || this;

        if (node.value === null) {
            node.value = value;

            return true;
        }

        if (node.value > value) {
            if (node.left === null) {
                node.left = new Root();
            }

            return this.insert(value, node.left);
        }

        if (node.value < value) {
            if (node.right === null) {
                node.right = new Root();
            }

            return this.insert(value, node.right);
        }

        return false;
    }

    findByValue<T>(value: T, node?: INode): INode | boolean {
        node = node || this;

        if (node.value === value) {
            return node;
        }

        if (node.value > value) {
            if (node.left === null) {
                return false;
            }
            return this.findByValue(value, node.left);
        }

        if (node.value < value) {
            if (node.right === null) {
                return false;
            }

            return this.findByValue(value, node.right);
        }

        return false;
    }

    remove<T>(value: T, node?: INode): boolean {
        node = node || this;
        let removeElem: any = this.findByValue(value);

        if (removeElem === null) {
            return false;
        }

        if (removeElem.value > node.value) {
            if (removeElem.value === node.right.value) {
                // Удаление узла без потомков
                if (removeElem.right === null && removeElem.left === null) {
                    node.right = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.right && removeElem.left) {
                    let minValue: INode = this.findMinValue(
                        removeElem.right.left,
                    );

                    this.remove(minValue.value);
                    node.right.value = minValue.value;

                    return true;
                }

                // Удаление узла с одним потомком
                if (removeElem.right === null || removeElem.left === null) {
                    node.right = removeElem.right;

                    return true;
                }
            }

            return this.remove(value, node.right);
        }

        if (removeElem.value < node.value) {
            if (removeElem.value === node.left.value) {
                // Удаление узла без потомков
                if (removeElem.right === null && removeElem.left === null) {
                    node.left = null;

                    return true;
                }

                // Удаление узла с двумя потомками
                if (removeElem.right && removeElem.left) {
                    let minValue: INode = this.findMinValue(
                        removeElem.right.left,
                    );

                    this.remove(minValue.value);
                    node.left.value = minValue.value;

                    return true;
                }

                // Удаление узла с одним потомком
                if (removeElem.right === null || removeElem.left === null) {
                    node.left = removeElem.left;

                    return true;
                }
            }

            return this.remove(value, node.left);
        }

        return false;
    }

    findMinValue(node: INode | null): INode {
        node = node || this;

        if (node.left === null && node.right === null) {
            return node;
        }

        return this.findMinValue(node.left);
    }
}

// Task 2

interface Array<T> {
    sortBubble<T>(callback: Function): T[];
}

Array.prototype.sortBubble = function <T>(callback: Function): T[] {
    for (let i: number = 0; i < this.length; i++) {
        for (let j: number = 0, k: number = 1; k < this.length; j++, k++) {
            if (callback(this[j], this[k])) {
                let tempValue: any = this[j];

                this[j] = this[k];
                this[k] = tempValue;
            }
        }
    }

    return this;
};

interface Array<T> {
    sortSelection<T>(callback: Function): T[];
}

Array.prototype.sortSelection = function <T>(callback: Function): T[] {
    let tempValue: any = null;

    for (let i: number = this.length - 1; i >= 0; i--) {
        let indexMaxValue: number = 0;

        for (let j: number = 1; j < i + 1; j++) {
            if (callback(this[j], this[indexMaxValue])) {
                indexMaxValue = j;
            }
        }

        tempValue = this[i];
        this[i] = this[indexMaxValue];
        this[indexMaxValue] = tempValue;
    }

    return this;
};
