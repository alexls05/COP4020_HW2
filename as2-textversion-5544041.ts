import * as readline from 'node:readline/promises';
import * as process from 'node:process';

abstract class Shape {
    abstract getArea(): number;
    abstract getPerimeter(): number;
}

abstract class Polygon extends Shape {
    abstract getLongestSementLength(): number;
    abstract getShortestSegmentLength(): number;
}

class Rectangle extends Polygon {
    constructor(length: number, width: number) {
        super();
        this.#length = length;
        this.#width = width;
    }

    getArea(): number {
        return this.#length * this.#width;
    }

    getPerimeter(): number {
        return 2 * (this.#length + this.#width);
    }

    getLongestSementLength(): number {
        return (this.#length > this.#width) ? this.#length : this.#width;
    }

    getShortestSegmentLength(): number {
        return (this.#length < this.#width) ? this.#length : this.#width;
    }

    #length: number;
    #width: number;
}
class Square extends Rectangle {
    constructor(side: number) {
        super(side, side);
    }
}
class Oval extends Shape {
    constructor(majorAxis: number, minorAxis: number) {
        super();
        this.#majorAxis = majorAxis;
        this.#minorAxis = minorAxis;
    }

    getArea(): number {
        return Math.PI * this.#majorAxis * this.#minorAxis;
    }
    getPerimeter(): number {
        return 2 * Math.PI * Math.sqrt((this.#majorAxis ** 2 + this.#minorAxis ** 2) / 2);
    }

    #majorAxis: number
    #minorAxis: number
}
class Circle extends Oval {
    constructor(radius: number) {
        super(radius, radius);
    }
}
class Triangle extends Polygon {
    constructor(x: number, y: number, z: number) {
        super();
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    getArea(): number {
        const s = (this.#x + this.#y + this.#z) / 2;
        return Math.sqrt(s * (s - this.#x) * (s - this.#y) * (s - this.#z));
    }

    getPerimeter(): number {
        return this.#x + this.#y + this.#z;
    }

    getLongestSementLength(): number {
        return Math.max(this.#x, this.#y, this.#z);
    }

    getShortestSegmentLength(): number {
        return Math.min(this.#x, this.#y, this.#z);
    }

    #x: number;
    #y: number;
    #z: number;
}

/* 
 * Prints the area + perimeter for each shape in shapes
 * Accepts: Array of shapes.
 * Returns: Nothing.
 * Can go wrong: Assumes shapes array is a valid array of Shape instances. Also assumes shapes have correct dimensions.
 */
function printResults(shapes: Shape[]) {
    let n: number = 0;
    for (let shape of shapes) {
        n++;
        console.log("Shape " + n + ":" + (shape.getArea() + shape.getPerimeter()));
    }
}

let rl = readline.createInterface(process.stdin, process.stdout);
let s: number = parseInt(await rl.question("Enter the number of polygons: "));
let shapes: Shape[] = [];

// Loop to get input from user about the shapes and their dimensions they want to enter
for (let i = 0; i < s; i++) {
    let type: string = await rl.question("Enter the type of polygon (rectangle, square, triangle, oval, circle): ");
    if (type === "rectangle") {
        let length: number = parseFloat(await rl.question("Enter the length: "));
        let width: number = parseFloat(await rl.question("Enter the width: "));
        shapes.push(new Rectangle(length, width));
    }
    else if (type === "square") {
        let side: number = parseFloat(await rl.question("Enter the length of the side: "));
        shapes.push(new Square(side));
    }
    else if (type === "triangle") {
        let x: number = parseFloat(await rl.question("Enter the length of side x: "));
        let y: number = parseFloat(await rl.question("Enter the length of side y: "));
        let z: number = parseFloat(await rl.question("Enter the length of side z: "));
        shapes.push(new Triangle(x, y, z));
    }
    else if (type === "oval") {
        let majorAxis: number = parseFloat(await rl.question("Enter the length of the major axis: "));
        let minorAxis: number = parseFloat(await rl.question("Enter the length of the minor axis: "));
        shapes.push(new Oval(majorAxis, minorAxis));
    }
    else if (type === "circle") {
        let radius: number = parseFloat(await rl.question("Enter the radius: "));
        shapes.push(new Circle(radius));
    }
    else {
        console.log("Invalid polygon type. Please enter 'rectangle', 'square', 'triangle', 'oval', or 'circle'.");
        i--;
    }
}
rl.close();
printResults(shapes);