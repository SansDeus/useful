import { coordinate } from '../types/coordinate';
import { Coordinate } from '../abstract/coordinate';

export interface IVector extends Coordinate {
	addForce: (vector: IVector, force: number) => this;
	normalize: () => void;
	subForce: (vector: IVector, force: number) => this;
	magnitude: number;
	hypotenuse: number;	
	abs: coordinate;
}
