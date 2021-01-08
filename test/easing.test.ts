import { assert as t } from 'chai';
import 'mocha';
import {Easing} from '../src/easing';
const values = [10, 20, 50, 100];
describe('Easing', () => {
	it('Elastics should work', () => {
		t.equal(Easing.linear(.3), .3);
		t.equal(Easing.outCirc(.3), 0.8785931814069968);
		t.equal(Easing.inElastic(.3), 0.9124533355010244);
		t.equal(Easing.outElastic(.2), 0.009129452507276276);
		t.equal(Easing.inOutElastic(.3), -0.01632063332668109);
		t.equal(Easing.inOutElastic(.6), 1.0767139419730511);
		const rdm = Easing.random();
		t.exists(rdm(.2));
	});
});