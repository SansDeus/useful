import { assert as t } from 'chai';
import 'mocha';
import sinon, { stub } from 'sinon';
import {Animate} from '../src/animate';

let count = 0;
const requestAnimationframeSpy = sinon.fake((o: any) => {
	if (count < 100) {
		count++;
		o();
	}
});

window.requestAnimationFrame = requestAnimationframeSpy;
describe('Animation', () => {
	beforeEach(() => {
		count = 0;
	});

	it('should get called.', () => {
		const a = (p: number) => {};
		Animate(a);
	});

	it('should try with options and callback', () => {
		const a = (p: number) => {};
		const cb = () => {
			t.isTrue(true);
		}
		Animate(a, { fps: 1, duration: 1, cb });
	});

	it('calls stop', () => {
		const a = (p: number) => {};
		const stop = () => {
			t.isTrue(true);
			return true;
		}
		Animate(a, { fps: 1, duration: 16, stop });
	});
});