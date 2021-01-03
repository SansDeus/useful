import { assert as t } from 'chai';
import 'mocha';
import {Curve} from '../src/curve';
const coordinates = [{ x: 0, y: 0}, {x: 50, y: 50}];
describe('Curve', () => {
	it('should return 25 at .5', () => {
		t.deepEqual(Curve(coordinates, .5), { x: 25, y: 25 });
	});
	it('should return 0 at .5', () => {
		coordinates.pop();
		t.deepEqual(Curve(coordinates, .5), { x: 0, y: 0 });
	});
});