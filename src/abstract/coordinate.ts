import { coordinate } from '../types/coordinate';
import { ICoordinate} from '../interfaces/ICoordinate';
import { Ecliptic } from '../ecliptic';

export abstract class Coordinate implements ICoordinate {
	x: number;
	y: number;

	static add = (primary: coordinate, secondary: coordinate) => {
		return { x: primary.x + secondary.x, y: primary.y + secondary.y };
	}

	static addAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x + amount, y: coordinate.y + amount };
	}

	static subtract = (primary: coordinate, secondary: coordinate) =>{ 
		return { x: primary.x - secondary.x, y: primary.y - secondary.y };
	}

	static subtractAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x - amount, y: coordinate.y - amount };
	}

	static multiply = (primary: coordinate, secondary: coordinate) =>{ 
		return { x: primary.x * secondary.x, y: primary.y * secondary.y };
	}

	static multiplyAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x * amount, y: coordinate.y * amount };
	}

	static divide = (primary: coordinate, secondary: coordinate) =>{ 
		if (secondary.x === 0 || secondary.y === 0) {
			throw new Error(`Divide by zero in secondary - x: ${secondary.x} y: ${secondary.y}`);
		}
		return { x: primary.x / secondary.x, y: primary.y / secondary.y };
	}

	static divideAcross = (coordinate: coordinate, amount: number) => {
		if (amount === 0) {
			throw new Error('Cannot divide by zero');
		}
		return { x: coordinate.x / amount, y: coordinate.y / amount };
	}

	static isEqual = (primary: coordinate, secondary: coordinate) => {
		return primary.x === secondary.x && primary.y === secondary.y;
	}

	static compare = (primary: coordinate, secondary: coordinate) => {
		const s = (a: number, b: number) => a < b ? -1 : a > b ? 1 : 0;
		return { x: s(primary.x, secondary.x), y: s(primary.y, secondary.y) };
	}

	static radian = (primary: coordinate, target: coordinate) => {
		return Ecliptic.Radian(primary, target);
	}

	static degree = (primary: coordinate, target: coordinate) => {
		return Ecliptic.Degree(primary, target);
	}

	static get zero () {
		return { x: 0, y: 0 };
	}

	protected static set = (primary: coordinate, secondary: coordinate) => {
		[primary.x, primary.y] = [secondary.x, secondary.y];
		return primary;
	};

	public set = (coordinate: coordinate) => {
		[this.x, this.y] = [coordinate.x, coordinate.y];
		return this;
	}

	public add = (coordinate: coordinate) => {
		this.set(Coordinate.add(this, coordinate));
		return this;
	}

	public addAcross = (amount: number) => {
		this.set(Coordinate.addAcross(this, amount));
		return this;
	}

	public subtract = (coordinate: coordinate) => {
		this.set(Coordinate.subtract(this, coordinate));
		return this;
	}

	public subtractAcross = (amount: number) => {
		this.set(Coordinate.subtractAcross(this, amount));
		return this;
	}

	public multiply = (coordinate: coordinate) => {
		this.set(Coordinate.multiply(this, coordinate));
		return this;
	}

	public multiplyAcross = (amount: number) => {
		this.set(Coordinate.multiplyAcross(this, amount));
		return this;
	}

	public divide = (coordinate: coordinate) => {
		this.set(Coordinate.divide(this, coordinate));
		return this;
	}

	public divideAcross = (amount: number) => {
		this.set(Coordinate.divideAcross(this, amount));
		return this;
	}

	public radians = (target: coordinate) => {
		return Coordinate.radian(this, target);
	}

	public degree = (target: coordinate) => {
		return Coordinate.degree(this, target);
	}

	public isEqual = (coordinate: coordinate) => {
		return Coordinate.isEqual(this, coordinate);
	}

	public compare = (coordinate: coordinate) => {
		return Coordinate.compare(this, coordinate);
	}

	constructor(coordinate?: coordinate) {
		[this.x, this.y] = [coordinate?.x ?? 0, coordinate?.y ?? 0];
	}
}