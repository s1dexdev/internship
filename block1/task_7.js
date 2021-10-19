// Rectangle

class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    get perimeter() {
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        return 2 * (this.#width + this.#height);
    }

    calcArea() {
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
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        return this.#sideA + this.#sideB + this.#sideC;
    }

    calcArea() {
        const semiPerimeter = this.calcPerimeter() / 2;

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
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        return 2 * Math.PI * this.#radius;
    }

    calcArea() {
        return Math.PI * this.#radius ** 2;
    }
}
