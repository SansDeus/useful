import { assert as t } from 'chai';
import 'mocha';
import {ThreeD} from '../src/threeD';
const coordinates = [{ x: 0, y: 0, z: 0 }, {x: 50, y: 50, z: 50 }];
describe('ThreeD', () => {
	it('should return all 25s at .5', () => {
		t.deepEqual(ThreeD(coordinates, .5), { x: 25, y: 25, z: 25 });
	});
});