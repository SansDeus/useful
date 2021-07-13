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

	/**
	 * 
	 * @param vector IVector
	 * @returns number
	 */
	public static hypotenuse (vector: IVector) {
		return Vect.hypot(vector.x, vector.y);
	}

	/**
	 * 
	 * @param main IVector
	 * @param target IVector
	 * @param force number
	 * @returns IVector
	 */
	public static addForce = (main: IVector, target: IVector, force: number) => {
		const vh = target.hypotenuse;
		main.add((target.divideAcross(vh).multiplyAcross(force)));
		return main;
	}
	
	/**
	 * 
	 * @param main IVector
	 * @param target IVector
	 * @param force number
	 * @returns IVector
	 */
	public static subForce = (main: IVector, target: IVector, force: number) => {
		const vh = target.hypotenuse;
		main.subtract((target.divideAcross(vh).multiplyAcross(force)));
		return main;
	}

	/**
	 * 
	 * @param target Type of IVector
	 */
	public static normalize<T extends IVector>(target: T) {
		const m = target.magnitude;
		if (m > 0) target.divideAcross(m);
	}

	/**
	 * 
	 * @param vector IVector
	 * @returns number
	 */
	public static magnitude(vector: IVector) {
		return Math.sqrt(Vect.distanceSquare(vector));
	}

	/**
	 * 
	 * @param vector IVector
	 * @param force number
	 * @returns this
	 */
	addForce = (vector: IVector, force: number): this => {
		return Vect.addForce(this, vector, force) as this;
	}

	/**
	 * 
	 * @param vector IVector
	 * @param force number
	 * @returns this
	 */
	subForce = (vector: IVector, force: number): this => {
		return Vect.subForce(this, vector, force) as this;
	}

	/**
	 * Normalize the vector
	 */
	normalize = () => {
		Vect.normalize(this);
	}

	/**
	 * @returns number
	 */
	get abs() {
		return { x: Math.abs(this.x), y: Math.abs(this.y) };
	}

	/**
	 * @returns number
	 */
	get hypotenuse (): number {
		return Vect.hypotenuse(this);
	}

	/**
	 * @returns number
	 */
	get magnitude(): number {
		return Vect.magnitude(this);
	}

	/**
	 * 
	 * @param coordinate coordinate optional
	 */
	constructor (coordinate?: coordinate) {
		super(coordinate);
	}
}
