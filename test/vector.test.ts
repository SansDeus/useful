import { assert as t } from 'chai';
import 'mocha';
import {GravityVector} from '../src/gravityVector';

describe('Gravity vector', () => {
	it('should update position of second vector', () => {
		const gv1 = new GravityVector();
		const gv2 = new GravityVector({ position: { x: 50, y: 50 } });
		const c1 = { x: gv2.x, y: gv2.y };
		const f = gv1.attract(gv2);
		gv2.applyForce(f);
		gv2.update();
		const c2 = { x: gv2.x, y: gv2.y };
		t.notDeepEqual(c1, c2);
	});
});
