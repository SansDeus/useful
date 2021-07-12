import { Vector } from '../vector';
import { minMax } from '../types';
import { IVector, IPhysicsVector } from '../interfaces';
import { PhysicsVectorOptions } from '../types/physicsVectorOptions';
import { Drag } from '../constants/calculations';
import { dragOptions } from '../types/dragOptions';
import { DEFAULT_DENSITY, DEFAULT_DISTANCE, DEFAULT_GRAVITY, DEFAULT_MASS, DEFAULT_RESTITUTION } from '../defaults/physicsVectorOptionDefaults';
import { Clamp } from '../clamp';
import { Coordinate } from './coordinate';

export abstract class PhysicsVect extends Vector implements IPhysicsVector {
	gravity: number;
	mass: number;
	density: number;
	restitution: number;
	acceleration: IVector;
	velocity: IVector;
	distanceClamp: minMax;

	static defaultOptions = {
		gravity: DEFAULT_GRAVITY,
		mass: DEFAULT_MASS,
		density: DEFAULT_DENSITY,
		restitution: DEFAULT_RESTITUTION,
		distanceClamp: DEFAULT_DISTANCE,
		acceleration: Vector.New,
		velocity: Vector.New
	}

	protected volume = (m: number, d: number) => m / d;

	constructor(params?: PhysicsVectorOptions) {
		super(params?.coordinate);
		const opts = { ...PhysicsVect.defaultOptions, ...params };
		this.gravity = opts.gravity;
		this.mass = opts.mass;
		this.acceleration = opts.acceleration;
		this.velocity = opts.velocity;
		this.distanceClamp = opts.distanceClamp;
		this.density = opts.density;
		this.restitution = opts.restitution;
	}

	set SetOptions (params: PhysicsVectorOptions) {
		const opts = { ...PhysicsVect.defaultOptions, ...params };
		this.gravity = opts.gravity;
		this.mass = opts.mass;
		this.acceleration = opts.acceleration;
		this.velocity = opts.velocity;
		this.distanceClamp = opts.distanceClamp;
		this.density = opts.density;
		this.restitution = opts.restitution;
	}

	public static attract = (primary: IPhysicsVector, secondary: IPhysicsVector) => {
		if (!primary.mass || isNaN(primary.mass) || !secondary.mass || isNaN(secondary.mass)) {
			throw new Error('attract: Main and target must have mass.');
		}
	
		if (!primary.gravity || isNaN(primary.gravity)) {
			throw new Error('attract: Main must have gravity.');
		}

		let force = PhysicsVect.New.set(Coordinate.subtract(primary, secondary));
		const distance = Clamp(force.magnitude, primary.distanceClamp.min, primary.distanceClamp.max);
		force.normalize();
		const strength = (primary.gravity * (primary.mass * secondary.mass)) / Math.pow(distance, 2);
		return force.multiplyAcross(strength);
	}
	
	public static applyForce = (vector: IPhysicsVector, force: IVector) => {
		if (!vector.mass || isNaN(vector.mass)) {
			throw new Error('applyForce: Vector must have mass');
		}
		if (!vector.acceleration) {
			throw new Error('applyforce: Vector acceleration is undefined');
		}
		const f = Coordinate.divideAcross(force, vector.mass);
		vector.acceleration.add(f);
		return vector;
	}

	public static drag = (vector: IPhysicsVector, dragOptions: dragOptions) => {
		if (!vector.velocity) return vector;
		const { density, area, reynolds, coefficient } = dragOptions;
		const force = Drag(density)({ area, coefficient, reynolds, velocity: vector.velocity.magnitude });
		vector.velocity.divideAcross(force);
		return vector;
	}

	public static updateGravity = (vector: IPhysicsVector) => {
		if (!vector.velocity || !vector.acceleration) {
			throw new Error('Vector velocity or acceleration are undefined.');
		}
	
		vector.velocity.add(vector.acceleration);
		vector.add(vector.velocity);
		vector.acceleration.set(Coordinate.zero);
		return vector;
	}

	public attract = (target: IPhysicsVector): this => {
		return PhysicsVect.attract(this, target) as this;
	}

	public applyForce = (force: IVector): this => {
		return PhysicsVect.applyForce(this, force) as this;
	}

	public drag = (dragOptions: dragOptions): this => {
		return PhysicsVect.drag(this, dragOptions) as this;
	}

	public updateGravity = (): this => {
		return PhysicsVect.updateGravity(this) as this;
	}

}