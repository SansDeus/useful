import { vector3 } from '../types/vector3';
export abstract class ColorVect {
	public static add = (prime: vector3, other: vector3): vector3 => {
		return [prime[0] + other[0], prime[1] + other[1], prime[2] + other[2]];
	}

	public static subtract = (prime: vector3, other: vector3): vector3 => {
		return [prime[0] - other[0], prime[1] - other[1], prime[2] - other[2]];
	}

	public static multiply = (prime: vector3, other: vector3): vector3 => {
		return [prime[0] * other[0], prime[1] * other[1], prime[2] * other[2]];
	}

	public static divide = (prime: vector3, other: vector3): vector3 => {
		return [prime[0] / other[0], prime[1] / other[1], prime[2] / other[2]];
	}

	public static addBy = (prime: vector3, amount: number): vector3 => {
		return [prime[0] + amount, prime[1] + amount, prime[2] + amount];
	}

	public static subtractBy = (prime: vector3, amount: number): vector3 => {
		return [prime[0] - amount, prime[1] - amount, prime[2] - amount];
	}

	public static multiplyBy = (prime: vector3, amount: number): vector3 => {
		return [prime[0] * amount, prime[1] * amount, prime[2] * amount];
	}

	public static divideBy = (prime: vector3, amount: number): vector3 => {
		return [prime[0] / amount, prime[1] / amount, prime[2] / amount];
	}

	public static addAll = (vectors: vector3[]): vector3 => {
		return vectors.reduce((p, c) => { return [p[0] + c[0], p[1] + c[1], p[2] + c[2]] });
	}

	public static subtractAll = (vectors: vector3[]): vector3 => {
		return vectors.reduce((p, c) => { return [p[0] - c[0], p[1] - c[1], p[2] - c[2]] });
	}

	public static multiplyAll = (vectors: vector3[]): vector3 => {
		return vectors.reduce((p, c) => { return [p[0] * c[0], p[1] * c[1], p[2] * c[2]] });
	}

	public static divideAll = (vectors: vector3[]): vector3 => {
		return vectors.reduce((p, c) => { return [p[0] / c[0], p[1] / c[1], p[2] / c[2]] });
	}

}
