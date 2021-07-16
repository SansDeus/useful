import { PhysicsVectorOptions } from './types';
import { PhysicsVect } from './abstract/physicsVect';

export class PhysicsVector extends PhysicsVect {
	constructor(params?: PhysicsVectorOptions) {
		super(params);
	}
	
	get Properties() {
		const { mass, density } = this;
		return { mass, density, volume: this.volume(mass, density) };
	}

	static Set = (params: PhysicsVectorOptions[]) => {
		return params.map((p) => new PhysicsVector(p));
	}
}
