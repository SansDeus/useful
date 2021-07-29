import { coordinate } from '../types/coordinate';
import { ICoordinate} from '../interfaces/ICoordinate';
import { Ecliptic } from '../ecliptic';

export abstract class Coordinate implements ICoordinate {
	x: number;
	y: number;

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate
	 */
	static add = (primary: coordinate, secondary: coordinate) => {
		return { x: primary.x + secondary.x, y: primary.y + secondary.y };
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @param amount number
	 * @returns coordinate
	 */
	static addAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x + amount, y: coordinate.y + amount };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate
	 */
	static subtract = (primary: coordinate, secondary: coordinate) =>{ 
		return { x: primary.x - secondary.x, y: primary.y - secondary.y };
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @param amount number
	 * @returns coordinate
	 */
	static subtractAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x - amount, y: coordinate.y - amount };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate
	 */
	static multiply = (primary: coordinate, secondary: coordinate) =>{ 
		return { x: primary.x * secondary.x, y: primary.y * secondary.y };
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @param amount number
	 * @returns coordinate
	 */
	static multiplyAcross = (coordinate: coordinate, amount: number) => {
		return { x: coordinate.x * amount, y: coordinate.y * amount };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate
	 */
	static divide = (primary: coordinate, secondary: coordinate) =>{ 
		if (secondary.x === 0 || secondary.y === 0) {
			throw new Error(`Divide by zero in secondary - x: ${secondary.x} y: ${secondary.y}`);
		}
		return { x: primary.x / secondary.x, y: primary.y / secondary.y };
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @param amount number
	 * @returns coordinate
	 */
	static divideAcross = (coordinate: coordinate, amount: number) => {
		if (amount === 0) {
			throw new Error('Cannot divide by zero');
		}
		return { x: coordinate.x / amount, y: coordinate.y / amount };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns boolean
	 */
	static isEqual = (primary: coordinate, secondary: coordinate) => {
		return primary.x === secondary.x && primary.y === secondary.y;
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate { x: -1 | 0 | 1, y: -1 | 0 | 1 }
	 */
	static compare = (primary: coordinate, secondary: coordinate) => {
		const s = (a: number, b: number) => a < b ? -1 : a > b ? 1 : 0;
		return { x: s(primary.x, secondary.x), y: s(primary.y, secondary.y) };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param target coordinate
	 * @returns number
	 */
	static radian = (primary: coordinate, target: coordinate) => {
		return Ecliptic.Radian(primary, target);
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param target coordinate
	 * @returns number
	 */
	static degree = (primary: coordinate, target: coordinate) => {
		return Ecliptic.Degree(primary, target);
	}

	/**
	 * @returns coordinate { x: 0, y: 0 } 
	 */
	static get zero () {
		return { x: 0, y: 0 };
	}

	/**
	 * 
	 * @param primary coordinate
	 * @param secondary coordinate
	 * @returns coordinate
	 */
	protected static set = (primary: coordinate, secondary: coordinate) => {
		[primary.x, primary.y] = [secondary.x, secondary.y];
		return primary;
	};

	/**
	 * 
	 * @param primary 
	 * @param secondary 
	 * @returns number
	 */
	static distance = (primary: coordinate, secondary: coordinate) => {
		const sub = Coordinate.subtract(primary, secondary);
		return Math.sqrt(Math.pow(sub.x, 2) + Math.pow(sub.y, 2));
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns this
	 */
	public set = (coordinate: coordinate) => {
		[this.x, this.y] = [coordinate.x, coordinate.y];
		return this;
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns this
	 */
	public add = (coordinate: coordinate) => {
		this.set(Coordinate.add(this, coordinate));
		return this;
	}

	/**
	 * 
	 * @param amount number
	 * @returns this
	 */
	public addAcross = (amount: number) => {
		this.set(Coordinate.addAcross(this, amount));
		return this;
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns this
	 */
	public subtract = (coordinate: coordinate) => {
		this.set(Coordinate.subtract(this, coordinate));
		return this;
	}

	/**
	 * 
	 * @param amount number
	 * @returns this
	 */
	public subtractAcross = (amount: number) => {
		this.set(Coordinate.subtractAcross(this, amount));
		return this;
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns this
	 */
	public multiply = (coordinate: coordinate) => {
		this.set(Coordinate.multiply(this, coordinate));
		return this;
	}

	/**
	 * 
	 * @param amount number 
	 * @returns this
	 */
	public multiplyAcross = (amount: number) => {
		this.set(Coordinate.multiplyAcross(this, amount));
		return this;
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns this
	 */
	public divide = (coordinate: coordinate) => {
		this.set(Coordinate.divide(this, coordinate));
		return this;
	}

	/**
	 * 
	 * @param amount number
	 * @returns this
	 */
	public divideAcross = (amount: number) => {
		this.set(Coordinate.divideAcross(this, amount));
		return this;
	}

	/**
	 * 
	 * @param target coordinate
	 * @returns number
	 */
	public radians = (target: coordinate) => {
		return Coordinate.radian(this, target);
	}

	/**
	 * 
	 * @param target coordinate
	 * @returns number
	 */
	public degree = (target: coordinate) => {
		return Coordinate.degree(this, target);
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns boolean
	 */
	public isEqual = (coordinate: coordinate) => {
		return Coordinate.isEqual(this, coordinate);
	}

	/**
	 * 
	 * @param coordinate coordinate
	 * @returns number
	 */
	public compare = (coordinate: coordinate) => {
		return Coordinate.compare(this, coordinate);
	}

	/**
	 * 
	 * @param coordinate 
	 * @returns number
	 */
	public distance = (coordinate: coordinate) => {
		return Coordinate.distance(this, coordinate);
	}

	/**
	 * 
	 * @param coordinate coordinate | undefined
	 */
	constructor(coordinate?: coordinate) {
		[this.x, this.y] = [coordinate?.x ?? 0, coordinate?.y ?? 0];
	}
}