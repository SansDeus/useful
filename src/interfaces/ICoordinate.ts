import { coordinate } from '../types/coordinate';

export interface ICoordinate extends coordinate {
	add: (coordinate: coordinate) => ICoordinate;
	subtract: (coordinate: coordinate) => ICoordinate;
	multiply: (coordinate: coordinate) => ICoordinate;
	divide: (coordinate: coordinate) => ICoordinate;
	addAcross: (amount: number) => ICoordinate;
	subtractAcross: (amount: number) => ICoordinate;
	multiplyAcross: (amount: number) => ICoordinate;
	divideAcross: (amount: number) => ICoordinate;
	isEqual: (coordinate: coordinate) => boolean;
	compare: (coordinate: coordinate) => coordinate;
	set: (coordinate: coordinate) => void;
}