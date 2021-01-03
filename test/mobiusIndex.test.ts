import { assert as t } from 'chai';
import 'mocha';
import { MobiusIndex } from '../src/mobiusIndex';
const n = [0,1,2,3,4,5];
describe('MobiusIndex', () => {
	it('should return 0 when given 6', () => {
		t.equal(MobiusIndex(n.length, 6), 0);
	});
});