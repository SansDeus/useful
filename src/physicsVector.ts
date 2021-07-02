import { PhysicsVectorOptions } from './types';
import { PhysicsVect } from './abstract/physicsVect';

export class PhysicsVector extends PhysicsVect {
	protected static PhysicsVector = new PhysicsVector(); 
	constructor(params?: PhysicsVectorOptions) {
		super(params);
	}
	
	get Properties() {
		const { mass, density } = this;
		return { mass, density, volume: this.volume(mass, density) };
	}

	static get New () {
		return this.PhysicsVector;
	}
}
