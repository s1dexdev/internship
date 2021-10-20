// Rectangle

class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    get perimeter() {
        return 2 * (this.#width + this.#height);
    }

    get area() {
        return this.#width * this.#height;
    }
}

//Triangle

class Triangle {
    #sideA;
    #sideB;
    #sideC;

    constructor(sideA, sideB, sideC) {
        this.#sideA = sideA;
        this.#sideB = sideB;
        this.#sideC = sideC;
    }

    get perimeter() {
        return this.#sideA + this.#sideB + this.#sideC;
    }

    get area() {
        const semiPerimeter = this.perimeter / 2;

        return Math.sqrt(
            semiPerimeter *
                ((semiPerimeter - this.#sideA) *
                    (semiPerimeter - this.#sideB) *
                    (semiPerimeter - this.#sideC)),
        );
    }
}

// Circle

class Circle {
    #radius;

    constructor(radius) {
        this.#radius = radius;
    }

    get perimeter() {
        return 2 * Math.PI * this.#radius;
    }

    get area() {
        return Math.PI * this.#radius ** 2;
    }
}
