import { assert as t } from 'chai';
import 'mocha';
import {Clamp, ClampAngle, ClampRadian} from '../src';

describe('Clamps', () => {
	describe('Clamp', () => {
		it('should return max of 20, when supplied 200.', () => {
			t.equal(Clamp(200, 0, 20), 20);
		});
		it('should return min of -20, when supplied -200.', () => {
			t.equal(Clamp(-200, -20, 0), -20);
		});
	});
	describe('ClampAngle', () => {
		it('should supply 359 when supplied 719', () => {
			t.equal(ClampAngle(719, 0, 360), 359);
		});
	});
	describe('ClampRadian', () => {
		it('should supply 3.14 when suppled 6.28', () => {
			t.equal(ClampRadian(6.28, 0, 3.14), 3.14);
		});
	});
});