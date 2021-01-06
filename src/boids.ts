// Updated to use typescript.
// Original repository is here: https://github.com/hughsk/boids
import { coordinate } from './types/coordinate';
import { boid } from './types/boid';
import { attractor } from './types/attractor';
import { boidInternal } from './types/boidInternal';
import { boidOptions } from './types/boidOptions';

export class Boids {
	private options: boidOptions;
	private deadPoint: coordinate = { x: 0, y: 0 };
	private defAttractor: attractor = { position: { x: Infinity, y: Infinity}, distance: 150, speed: .25 };
	private assignDefaults (options?: boidOptions): boidInternal {
		let { 
			speedLimitRoot, accelerationLimitRoot, speedLimit,
			accelerationLimit, separationDistance, alignmentDistance,
			cohesionDistance, separationForce, cohesionForce,
			alignmentForce, attractors, alignment,
			boids
		 } = (options ?? {});
		 speedLimitRoot ??= 0;
		 accelerationLimitRoot ??= 1;
		 speedLimit ??= Math.pow(speedLimitRoot, 2);
		 accelerationLimit ??= Math.pow(accelerationLimitRoot, 2);
		 separationDistance ??= Math.pow(separationDistance ?? 60, 2);
		 alignmentDistance ??= Math.pow(alignmentDistance ?? 180, 2);
		 cohesionDistance ??= Math.pow(cohesionDistance || 180, 2);
		 separationForce ??= .15;
		 cohesionForce ??= .1;
		 alignmentForce ??= (alignment || .25);
		 attractors ??= [this.defAttractor];
		 if (typeof(boids) === 'number') {
			 boids = Array.apply(null, new Array(boids)).map((u: unknown, i: number): boid => { 
				 return { position: this.deadPoint, speed: this.deadPoint, acceleration: this.deadPoint };
			 }) as boid[];
		 }
		 return {
			speedLimitRoot, accelerationLimitRoot, speedLimit,
			accelerationLimit, separationDistance, alignmentDistance,
			cohesionDistance, separationForce, cohesionForce,
			alignmentForce: alignmentForce ?? NaN, attractors, boids: (boids ?? [] as boid[])
		 };
	}

	// double-dog-leg hypothenuse approximation
	// http://forums.parallax.com/discussion/147522/dog-leg-hypotenuse-approximation
	private hypot = (a: number, b: number) => {
		[a, b] = [Math.abs(a), Math.abs(b)];
		const [n, x] = [Math.min(a, b), Math.max(a, b)];
		return x + 3 * n / 32 + Math.max(0, 2 * n - x) / 8 + Math.max(0, 4 * n - x) / 16;
	}

	private hypotCoord = (coord: coordinate) => this.hypot(coord.x, coord.y);

	Update = async (): Promise<coordinate[]> => {
		const { 
			separationDistance, separationForce,
			cohesionDistance, cohesionForce, alignmentDistance,
			alignmentForce, speedLimit, accelerationLimit,
			accelerationLimitRoot, speedLimitRoot, attractors } = this.options as boidInternal;

		const ap = (p1: coordinate, p2: coordinate): coordinate => { return { x: p1.x + p2.x, y: p1.y + p2.y }; };
		const sp = (p1: coordinate, p2: coordinate): coordinate => { return { x: p1.x - p2.x, y: p1.y - p2.y }; };
		const mp = (p1: coordinate, m: number): coordinate => { return { x: p1.x * m, y: p1.y * m }; };
		const af = (p: coordinate, m: number, fp: coordinate) => {
			const h = this.hypotCoord(fp);
			p.x += (m * (fp.x / h)) || 0;
			p.y += (m * (fp.y / h)) || 0;
			return p;
		};
		const sf = (p: coordinate, m: number, fp: coordinate) => {
			const h = this.hypotCoord(fp);
			p.x -= (m * (fp.x / h)) || 0;
			p.y -= (m * (fp.y / h)) || 0;
			return p;
		};
		const distSquared = (p: coordinate) => (p.x * p.x) + (p.y * p.y);

		let boids = this.options.boids as boid[];
		let size = boids.length;
		let current = size;
		let [target, attractorCount, ratio] = [0, attractors.length, 0];

		while (current--) {
			let [sfp, cfp, afp, xfp, attractor] = [this.deadPoint, this.deadPoint, this.deadPoint, this.deadPoint, {} as attractor];

			// Attractors
			target = attractorCount;
			while (target--) {
				attractor = attractors[target];
				xfp = sp(boids[current].position, attractor.position);
				if (distSquared(xfp) < (attractor.distance * attractor.distance)) {
					boids[current].speed = sf(boids[current].speed, attractor.speed, xfp);
				}
			}

			target = size;
			while (target--) {
				if (target === current) continue;
				xfp = sp(boids[current].position, boids[target].position);
				const ds = distSquared(xfp);
				if (ds < separationDistance) {
					sfp = ap(sfp, xfp);
				} else {
					if (ds < cohesionDistance) {
						cfp = ap(cfp, xfp);
					}
					if (ds < alignmentDistance) {
						afp = ap(afp, boids[target].speed);
					}
				}
			}

			// Separation
			boids[current].acceleration = af(boids[current].acceleration, separationForce, sfp);
			// Cohesion
			boids[current].acceleration = sf(boids[current].acceleration, cohesionForce, cfp);
			// Alignment
			boids[current].acceleration = sf(boids[current].acceleration, alignmentForce, afp);
		}
		current = size;

		// Apply speed/acceleration for this tick.
		while (current--) {
			if (accelerationLimit) {
				if (distSquared(boids[current].acceleration) > accelerationLimit) {
					ratio = accelerationLimitRoot / this.hypotCoord(boids[current].acceleration);
					boids[current].speed = mp(boids[current].speed, ratio);
				}
			}

			boids[current].speed = ap(boids[current].speed, boids[current].acceleration);

			if (speedLimit) {
				if (distSquared(boids[current].speed) > speedLimit) {
					ratio = speedLimitRoot / this.hypotCoord(boids[current].speed);
					boids[current].speed = mp(boids[current].speed, ratio);
				}
			}

			boids[current].position = ap(boids[current].position, boids[current].speed);
		}

		return boids.map((b: boid) => b.position);
	}

	constructor(options?: boidOptions) {
		this.options = this.assignDefaults(options);
	}
}
