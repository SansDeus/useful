import { assert as t } from 'chai';
import 'mocha';
import { RandomColor } from '../src/randomColor';

describe('RandomColor', () => {
	const color = RandomColor();
	const rx = /\#[0-9a-f]{6}/i;
	it('should pass regex test of #, 6 characters [0-9a-f]', () => {
		t.isTrue(rx.test(color));
	});
});
