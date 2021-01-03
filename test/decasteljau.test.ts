import { assert as t } from 'chai';
import 'mocha';
import { Decasteljau } from '../src/decasteljau';

const numbers = [30,20,10,50,900,8];
describe('Decasteljau', () => {
	it('should return 30 at 0%', () => {
		t.equal(Decasteljau(numbers, 0), 30, 'Not equal to 30');
	});
	it('should return 303.70 at .9', () => {
		t.equal(Decasteljau(numbers, .9), 303.7042199999999, 'Not what was expected.');
	});
	it('should return 8 at 1', () => {
		t.equal(Decasteljau(numbers, 1), 8, 'Not equal to 8');
	});
});
