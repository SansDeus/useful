import { assert as t } from 'chai';
import 'mocha';
import {GravityVector} from '../src/gravityVector';
import { coordinate } from '../src/interfaces';

describe('Gravity vector', () => {
	let c1: coordinate, c2: coordinate, c3: coordinate, c4: coordinate;
	const gv1 = new GravityVector();
	const gv2 = new GravityVector({ position: { x: 50, y: 50 } });
	c1 = { x: gv2.x, y: gv2.y };

	it('should update position of second vector', () => {
		const f = gv1.attract(gv2);
		gv2.applyForce(f);
		gv2.update();
		c2 = { x: gv2.x, y: gv2.y };
		t.notDeepEqual(c1, c2);
	});

	it('should add force and change position', () => {
		gv1.addForce(gv2, 2);
		c3 = { x: gv2.x, y: gv2.y };
		t.notDeepEqual(c2, c3);	
	});

	it('should sub force and change position', () => {
		gv1.subForce(gv2, 12);
		c4 = { x: gv2.x, y: gv2.y };
		t.notDeepEqual(c3, c4);
	});

	it('hypotenuse should be a number', () => {
		t.isNumber(gv1.hypotenuse);
	});

	it('should set position to 15', () => {
		const newPos = { x: 15, y: 15 };
		gv2.set(newPos);
		t.equal(gv2.x, 15);
	});

	it('should zero out position', () => {
		gv2.zero().normalize();
		t.equal(gv2.x, 0);
	});
});
