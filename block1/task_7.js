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
        const perimeter = this.calcPerimeter();
        const p = perimeter / 2;
        const area = Math.sqrt(
            p * ((p - this.#sideA) * (p - this.#sideB) * (p - this.#sideC)),
        );

        return area;
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
        const perimeter = 2 * Math.PI * this.#radius;

        return perimeter;
    }

    calcArea() {
        const area = Math.PI * this.#radius ** 2;

        return area;
    }
}
