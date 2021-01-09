import {coordinate} from '../interfaces/coordinate';
export abstract class VectorBase implements coordinate {
	x: number;
	y: number;

	protected static deadPoint = { x: 0, y: 0 };
	protected static square = (n: number) => n * n;
	protected distanceSquare = (p: coordinate) => VectorBase.square(p.x) + VectorBase.square(p.y);

	// double-dog-leg hypothenuse approximation
	// http://forums.parallax.com/discussion/147522/dog-leg-hypotenuse-approximation
	protected hypot = (a: number, b: number) => {
		[a, b] = [Math.abs(a), Math.abs(b)];
		const [n, x] = [Math.min(a, b), Math.max(a, b)];
		return x + 3 * n / 32 + Math.max(0, 2 * n - x) / 8 + Math.max(0, 4 * n - x) / 16;
	}

	addForce = (vector: VectorBase, force: number) => {
		const vh = vector.hypotenuse;
		this.add((vector.divide(vh).multiply(force)));
		return this;
	}

	subForce = (vector: VectorBase, force: number) => {
		const vh = vector.hypotenuse;
		this.subtract((vector.divide(vh).multiply(force)));
		return this;
	}

	add = (coordinate: coordinate) => {
		this.x += coordinate.x;
		this.y += coordinate.y;
		return this;
	}

	subtract = (coordinate: coordinate) => {
		this.x -= coordinate.x;
		this.y -= coordinate.y;
		return this;
	}

	multiply = (amount: number) => {
		this.x *= amount;
		this.y *= amount;
		return this;
	}

	divide = (amount: number) => {
		this.x /= amount;
		this.y /= amount;
		return this;
	}

	normalize = () => {
		const m = this.magnitude;
		return (m > 0) ? this.divide(m) : this;
	}

	set = (coordinate: coordinate) => {
		this.x = coordinate.x;
		this.y = coordinate.y;
		return this;
	}

	zero = () => {
		this.x = 0;
		this.y = 0;
		return this;
	}

	get hypotenuse () {
		return this.hypot(this.x, this.y);
	}

	get magnitude() {
		const { x, y } = this;
		return Math.sqrt(this.distanceSquare({ x, y }));
	}

	constructor (coordinate: coordinate) {
		this.x = coordinate.x;
		this.y = coordinate.y;
	}
}
