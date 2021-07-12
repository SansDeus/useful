import {coordinate} from '../types';
import {IVector} from '../interfaces/IVector';
import {Coordinate} from './coordinate';

export abstract class Vect extends Coordinate implements IVector {
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
		super(coordinate);
	}
}
