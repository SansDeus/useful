import {coordinate} from '../types';
import {IVector} from '../interfaces/IVector';
import {Coordinate} from './coordinate';

export abstract class Vect implements IVector {
	x: number;
	y: number;
	acceleration?: IVector;
	velocity?: IVector;

	private static distanceSquare = (p: coordinate) => Math.pow(p.x, 2) + Math.pow(p.y, 2);

	// double-dog-leg hypothenuse approximation
	// http://forums.parallax.com/discussion/147522/dog-leg-hypotenuse-approximation
	private static hypot = (a: number, b: number) => {
		[a, b] = [Math.abs(a), Math.abs(b)];
		const [n, x] = [Math.min(a, b), Math.max(a, b)];
		return x + 3 * n / 32 + Math.max(0, 2 * n - x) / 8 + Math.max(0, 4 * n - x) / 16;
	}

	public static hypotenuse (vector: IVector) {
		return Vect.hypot(vector.x, vector.y);
	}

	public static addForce = (main: IVector, target: IVector, force: number) => {
		const vh = target.hypotenuse;
		main.add((target.divideAcross(vh).multiplyAcross(force)));
		return main;
	}
	
	public static subForce = (main: IVector, target: IVector, force: number) => {
		const vh = target.hypotenuse;
		main.subtract((target.divideAcross(vh).multiplyAcross(force)));
		return main;
	}
		
	public static normalize<T extends IVector>(target: T) {
		const m = target.magnitude;
		if (m > 0) target.divideAcross(m);
	}

	public static magnitude(vector: IVector) {
		return Math.sqrt(Vect.distanceSquare(vector));
	}

	set = (coordinate: coordinate) => {
		[this.x, this.y] = [coordinate.x, coordinate.y];
		return this;
	}

	add = (coordinate: coordinate) => {
		this.set(Coordinate.add(this, coordinate));
		return this;
	}

	addAcross = (amount: number) => {
		this.set(Coordinate.addAcross(this, amount));
		return this;
	}

	subtract = (coordinate: coordinate) => {
		this.set(Coordinate.subtract(this, coordinate));
		return this;
	}

	subtractAcross = (amount: number) => {
		this.set(Coordinate.subtractAcross(this, amount));
		return this;
	}

	multiply = (coordinate: coordinate) => {
		this.set(Coordinate.multiply(this, coordinate));
		return this;
	}

	multiplyAcross = (amount: number) => {
		this.set(Coordinate.multiplyAcross(this, amount));
		return this;
	}

	divide = (coordinate: coordinate) => {
		this.set(Coordinate.divide(this, coordinate));
		return this;
	}

	divideAcross = (amount: number) => {
		this.set(Coordinate.divideAcross(this, amount));
		return this;
	}

	isEqual = (coordinate: coordinate) => {
		return Coordinate.isEqual(this, coordinate);
	}

	compare = (coordinate: coordinate) => {
		return Coordinate.compare(this, coordinate);
	}

	addForce = (vector: IVector, force: number): this => {
		return Vect.addForce(this, vector, force) as this;
	}

	subForce = (vector: IVector, force: number): this => {
		return Vect.subForce(this, vector, force) as this;
	}

	normalize = () => {
		Vect.normalize(this);
	}

	get abs() {
		return { x: Math.abs(this.x), y: Math.abs(this.y) };
	}

	get hypotenuse (): number {
		return Vect.hypotenuse(this);
	}

	get magnitude(): number {
		return Vect.magnitude(this);
	}

	constructor (coordinate?: coordinate) {
		[this.x, this.y] = [
			coordinate?.x ?? Coordinate.zero.x,
			coordinate?.y ?? Coordinate.zero.y
		];
	}
}
