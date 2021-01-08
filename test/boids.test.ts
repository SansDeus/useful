import { assert as t } from 'chai';
import 'mocha';
import {Boids} from '../src/boids';
import {boid} from '../src/types/boid';
import { coordinate } from '../src/interfaces/coordinate';

describe('Boids', () => {
	const deadPoint = { x: 0, y: 0 };
	const bops = {
		boids: 2,
		speedLimit: 0,
		accelerationLimit: 5,
		separationDistance: 25,
		alignmentDistance: 180,
		cohesionDistance: 180,
		separationForce: .5,
		alignmentForce: .25,
		cohesionForce: .1,
		attractors: []
	 };
	
	const getPos = (boids: boid[]) => boids.map(b => b.position as coordinate);
	it('should return empty positions', async () => {
		const b = new Boids(bops);
		b.boids = b.blankBoids(2, deadPoint);
		const result = getPos(b.boids as boid[]);
		t.deepEqual(result, [ deadPoint, deadPoint]);
	});

	it('should update boid position', async () => {
		const b = new Boids(bops);
		const last = getPos(b.boids as boid[]);
		b.TargetPositions([{position: {x: 100, y: 100 }, force: .23, radius: 20 }]);
		b.Update();
		const next = getPos(b.boids as boid[]);
		t.notDeepEqual(last, next);
	});
});
