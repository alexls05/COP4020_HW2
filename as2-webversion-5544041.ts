// import * as readline from 'node:readline/promises';
// import * as process from 'node:process';

abstract class Shape {
    abstract getArea(): number;
    abstract getPerimeter(): number;
    abstract drawMe(drawingContext: CanvasRenderingContext2D, startx: number, starty: number): void;
}

abstract class Polygon extends Shape {
    abstract getLongestSegmentLength(): number;
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

    getLongestSegmentLength(): number {
        return (this.#length > this.#width) ? this.#length : this.#width;
    }

    getShortestSegmentLength(): number {
        return (this.#length < this.#width) ? this.#length : this.#width;
    }

    drawMe(drawingContext: CanvasRenderingContext2D, startx: number, starty: number): void {
        drawingContext.beginPath();
        drawingContext.rect(startx, starty, this.getLongestSegmentLength(), this.getShortestSegmentLength());
        drawingContext.stroke();
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
    getLongestSegmentLength(): number {
        return (this.#majorAxis > this.#minorAxis) ? this.#majorAxis : this.#minorAxis;
    }
    getShortestSegmentLength(): number {
        return (this.#majorAxis < this.#minorAxis) ? this.#majorAxis : this.#minorAxis;
    }
    drawMe(drawingContext: CanvasRenderingContext2D, startx: number, starty: number): void {
        drawingContext.beginPath();
        drawingContext.ellipse(startx + this.getLongestSegmentLength() / 2, starty + this.getShortestSegmentLength() / 2, this.getLongestSegmentLength() / 2, this.getShortestSegmentLength() / 2, 0, 0, 2 * Math.PI);
        drawingContext.stroke();
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

    getLongestSegmentLength(): number {
        return Math.max(this.#x, this.#y, this.#z);
    }

    getShortestSegmentLength(): number {
        return Math.min(this.#x, this.#y, this.#z);
    }
    drawMe(drawingContext: CanvasRenderingContext2D, startx: number, starty: number): void {
        const base = this.#x;
        const vertexX = (this.#z ** 2 + base ** 2 - this.#y ** 2) / (2 * base);
        const vertexY = Math.sqrt(this.#z ** 2 - vertexX ** 2);

        drawingContext.beginPath();
        drawingContext.moveTo(startx, starty);
        drawingContext.lineTo(startx + base, starty);
        drawingContext.lineTo(startx + vertexX, starty - vertexY);
        drawingContext.closePath();
        drawingContext.stroke();
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
    let n = 0;
    for (let shape of shapes) {
        n++;
        console.log("Shape " + n + ":" + (shape.getArea() + shape.getPerimeter()));
    }
}

let s: number = 0;
let shapes: Shape[] = [];