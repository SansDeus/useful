import { attractor } from './attractor';

export type boidOptions = {
	boids: number;
	speedLimit?: number;
	accelerationLimit?: number;
	separationDistance?: number;
	alignmentDistance?: number;
	cohesionDistance?: number;
	separationForce?: number;
	cohesionForce?: number;
	alignmentForce?: number;
	alignment?: number;
	attractors?: attractor[];
}
