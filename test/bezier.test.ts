import { assert as t } from 'chai';
import 'mocha';
import {Bezier} from '../src/bezier';

describe('Bezier', () => {
	it('return 0 on with empty array', () => {
		const n: number[] = [];
		const b = Bezier(n);
		t.equal(b(1), 0);
	});
});
