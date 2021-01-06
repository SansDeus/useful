import { attractor } from './attractor';
import { boid } from './boid';

export type boidInternal = {
	speedLimitRoot: number;
	accelerationLimitRoot: number;
	speedLimit: number;
	accelerationLimit: number;
	separationDistance: number;
	alignmentDistance: number;
	cohesionDistance: number;
	separationForce: number;
	cohesionForce: number;
	alignmentForce: number;
	attractors: attractor[];
	boids: boid[];
}
