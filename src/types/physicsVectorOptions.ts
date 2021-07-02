import { IVector } from "../interfaces";
import { coordinate } from "./coordinate";
import { minMax } from "./minMax";

export type PhysicsVectorOptions = {
	coordinate?: coordinate,
	gravity?: number,
	mass?: number,
	density?: number,
	restitution?: number,
	acceleration?: IVector,
	velocity?: IVector,
	distanceClamp?: minMax
};
