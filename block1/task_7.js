'use strict';

// Rectangle

class Rectangle {
    constructor(sideA, sideB) {
        this.sideA = sideA;
        this.sideB = sideB;
    }

    get perimeter() {
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        return 2 * (this.sideA + this.sideB);
    }

    calcArea() {
        return this.sideA * this.sideB;
    }
}

//Triangle

class Triangle {
    constructor(sideA, sideB, sideC) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    get perimeter() {
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        return this.sideA + this.sideB + this.sideC;
    }

    calcArea() {
        const perimeter = this.calcPerimeter();
        const p = perimeter / 2;
        const area = Math.sqrt(
            p * ((p - this.sideA) * (p - this.sideB) * (p - this.sideC)),
        );

        return area;
    }
}

// Circle

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get perimeter() {
        return this.calcPerimeter();
    }

    get area() {
        return this.calcArea();
    }

    calcPerimeter() {
        const perimeter = 2 * Math.PI * this.radius;

        return perimeter;
    }

    calcArea() {
        const area = Math.PI * this.radius ** 2;

        return area;
    }
}
