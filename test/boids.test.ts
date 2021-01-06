import { assert as t } from 'chai';
import 'mocha';
import {Boids} from '../src/boids';
import {boid} from '../src/types/boid';
import {RandomRange} from '../src/randomrange';

describe('Boids', () => {
	it('should return empty positions', async () => {
		const b = new Boids({ boids: 1 });
		const result = await b.Update();
		t.deepEqual(result, [ { x: 0, y: 0 }]);
	});

	it('should update boid position', async () => {
		const a = Array.apply(null, new Array(5)).map((u: unknown, i: number) => {
			return { position: { x: RandomRange(0, 500), y: RandomRange(0, 500)}, speed: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 } } as boid;
		});
		const b = new Boids({ boids: a });
		const last = await b.Update();
		const next = await b.Update();
		t.notDeepEqual(next, last);
	});
});
