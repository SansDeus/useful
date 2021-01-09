import {Clamp} from './clamp';
import {coordinate} from './interfaces';
import {Vector} from './vector';
import {minMax} from './types';

export type GravityVectorOptions = { position?: coordinate, gravity?: number, mass?: number, distanceClamp?: minMax };
export class GravityVector extends Vector {
	velocity = new Vector(GravityVector.deadPoint);
	acceleration = new Vector(GravityVector.deadPoint);
	gravity: number;
	mass: number;
	distanceClamp: minMax;

	private defaults = { position: GravityVector.deadPoint, gravity: 1, mass: 20, distanceClamp: { min: 5, max: 20 } };

	public attract = (target: GravityVector) => {
		let force = this.subtract(target);
		const distance = Clamp(force.magnitude, this.distanceClamp.min, this.distanceClamp.max);
		force = force.normalize();
		const strength = (this.gravity * (this.mass * target.mass)) / GravityVector.square(distance);
		return force.multiply(strength);
	}

	public applyForce = (force: GravityVector) => {
		const f = force.divide(this.mass);
		this.acceleration.add(f);
	}

	public update = () => {
		this.velocity.add(this.acceleration);
		this.add(this.velocity);
		this.acceleration.zero();
	}

	constructor(options?: GravityVectorOptions) {
		super(options?.position);
		const { gravity, mass, distanceClamp } = { ...this.defaults, ...options };
		this.gravity = gravity;
		this.mass = mass;
		this.distanceClamp = distanceClamp;
	}
}
