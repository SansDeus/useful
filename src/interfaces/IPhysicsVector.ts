import { coordinate, dragOptions, minMax } from '../types';
import { IVector } from './IVector';

export interface IPhysicsVector extends IVector {
	mass?: number;
	gravity?: number;
	density: number;
	restitution: number;
	distanceClamp: minMax;
	acceleration: IVector;
	velocity: IVector;
	attract: (target: IPhysicsVector) => this;
	applyForce: (force: IVector) => this;
	addGravity: (gravity: number, axis?: 'x' | 'y') => this;
	updateGravity: () => this;
	bindToArea: (params: {min: coordinate, max: coordinate }) => void;
	drag: (params: dragOptions) => this;
}