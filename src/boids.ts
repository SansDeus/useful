// Updated to use typescript.
// Original repository is here: https://github.com/hughsk/boids
import { coordinate } from './types/coordinate';
import { RandomRange } from './randomrange';
import { boid, attractor, attractorPartial, boidInternal, boidOptions } from './types';

export class Boids {
	public speedLimitRoot: number;
	public accelerationLimitRoot: number;
	public speedLimit: number;
	public accelerationLimit: number;
	public separationDistance: number;
	public alignmentDistance: number;
	public cohesionDistance: number;
	public separationForce: number;
	public cohesionForce: number;
	public alignmentForce: number;
	public attractors: attractor[] = [];
	public boids: boid[] = [];

	private defAttractor: attractor = { position: { x: Infinity, y: Infinity }, radius: 10, force: .25 };
	private deadPoint = { x: 0, y: 0 } as coordinate;
	// double-dog-leg hypothenuse approximation
	// http://forums.parallax.com/discussion/147522/dog-leg-hypotenuse-approximation
	private hypot = (a: number, b: number) => {
		[a, b] = [Math.abs(a), Math.abs(b)];
		const [n, x] = [Math.min(a, b), Math.max(a, b)];
		return x + 3 * n / 32 + Math.max(0, 2 * n - x) / 8 + Math.max(0, 4 * n - x) / 16;
	}
	private hypotCoord = (coord: coordinate) => this.hypot(coord.x, coord.y);
	private sqr = (n: number) => n * n;
	private dSqr = (p: coordinate) => this.sqr(p.x) + this.sqr(p.y);
	private ap = (p1: coordinate, p2: coordinate): coordinate => { return { x: p1.x + p2.x, y: p1.y + p2.y }; };
	private sp = (p1: coordinate, p2: coordinate): coordinate => { return { x: p1.x - p2.x, y: p1.y - p2.y }; };
	private mp = (p: coordinate, m: number): coordinate => { return { x: p.x * m, y: p.y * m }; };
	private af = (m: number, p: coordinate, fp: coordinate) => {
		const h = this.hypotCoord(fp);
		p.x += (m * (fp.x / h)) || 0;
		p.y += (m * (fp.y / h)) || 0;
		return p;
	};
	private sf = (m: number, p: coordinate, fp: coordinate) => {
		const h = this.hypotCoord(fp);
		p.x -= (m * (fp.x / h)) || 0;
		p.y -= (m * (fp.y / h)) || 0;
		return p;
	};

	// Update the attractors to the target position.
	TargetPositions = (targets: attractorPartial[]): void => {
		const defaults = { speed: this.speedLimit, distance: this.separationDistance };
		this.attractors = targets.map((t) => {
			return { ...this.defAttractor, ...t};
		}) as attractor[];
	}

	Update = async (): Promise<void> => {
		const { 
			accelerationLimitRoot, accelerationLimit, alignmentDistance, alignmentForce,
			attractors, boids, cohesionDistance, cohesionForce,
			separationDistance, separationForce, speedLimitRoot, speedLimit
		} = this as boidInternal;

		let size = boids.length;
		let current = size;
		let [target, attractorCount, ratio] = [0, attractors.length, 0];
		while (current--) {
			let [sforce, cforce, aforce, xforce, attractor] = [this.deadPoint, this.deadPoint, this.deadPoint, this.deadPoint, {} as attractor]; 
			// Attractors
			target = attractorCount;
			while (target--) {
				attractor = attractors[target];
				xforce = this.sp(boids[current].position, attractor.position);
				if (this.dSqr(xforce) < Math.sqrt(attractor.radius)) {
					boids[current].speed = this.sf(attractor.force, boids[current].speed, xforce);
				}
			}
			target = size;
			while (target--) {
				if (target === current) continue;
				xforce = this.sp(boids[current].position, boids[target].position);
				const ds = this.dSqr(xforce);
				if (ds < separationDistance) {
					sforce = this.ap(sforce, xforce);
				} else {
					if (ds < cohesionDistance) {
						cforce = this.ap(cforce, xforce);
					}
					if (ds < alignmentDistance) {
						aforce = this.ap(aforce, boids[target].speed);
					}
				}
			}
			boids[current].acceleration = this.af(separationForce, boids[current].acceleration, sforce); // Separation
			boids[current].acceleration = this.sf(cohesionForce, boids[current].acceleration, cforce); // Cohesion
			boids[current].acceleration = this.sf(alignmentForce, boids[current].acceleration, aforce); // Alignment
		}
		current = size;
		// Apply speed/acceleration for this tick.
		while (current--) {
			if (accelerationLimit && this.dSqr(boids[current].acceleration) > accelerationLimit) {
				ratio = accelerationLimitRoot / this.hypotCoord(boids[current].acceleration);
				boids[current].acceleration = this.mp(boids[current].acceleration, ratio);
			}
			boids[current].speed = this.ap(boids[current].speed, boids[current].acceleration);
			if (speedLimit && this.dSqr(boids[current].speed) > speedLimit) {
				ratio = speedLimitRoot / this.hypotCoord(boids[current].speed);
				boids[current].speed = this.mp(boids[current].speed, ratio);
			}
			boids[current].position = this.ap(boids[current].position, boids[current].speed);
		}
		return;
	}

	blankBoids = (count: number, position?: coordinate) => {
		const rPos = () => RandomRange(0, this.separationDistance * 2) - this.separationDistance;
		const [defSpeed, defAcceleration] = [{ x: this.speedLimit, y: this.speedLimit }, { x: this.accelerationLimit, y: this.accelerationLimit }];
		return Array.apply(null, new Array(count)).map(() => {
			return { position: position ?? { x: rPos(), y: rPos() }, speed: defSpeed, acceleration: defAcceleration } as boid;
		});
	}

	constructor(options?: boidOptions) {
		let { 
			speedLimit, accelerationLimit, separationDistance, alignmentDistance,
			cohesionDistance, separationForce, cohesionForce, alignmentForce,
			attractors, alignment, boids
		} = (options ?? {});
		boids ??= 50;
		this.speedLimitRoot = (speedLimit || 0);
		this.accelerationLimitRoot = (accelerationLimit || 1);
		this.speedLimit = Math.pow(this.speedLimitRoot, 2);
		this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2);
		this.separationDistance = Math.pow(separationDistance || 60, 2);
		this.alignmentDistance = Math.pow(alignmentDistance || 180, 2);
		this.cohesionDistance = Math.pow(cohesionDistance || 180, 2);
		this.separationForce = separationForce || .15;
		this.cohesionForce = cohesionForce || .1;
		this.alignmentForce = alignmentForce || alignment || .25;
		this.attractors = attractors || [];
		this.boids = this.blankBoids(boids);
	}
}
