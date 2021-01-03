import { assert as t } from 'chai';
import 'mocha';
import {ColorPercent} from '../src/colorPercent';

const colors = ["#FF0000", "#00FF00", "#0000FF"];
describe('ColorPercent.getColor', () => {
	let result = '#000000';
	it('should return #ff0000 for 0.', () => {
		result = ColorPercent.getColor(colors, 0);
		t.notEqual(result, '#000000', 'Still the initial value.');
		t.equal(result, '#ff0000', 'Not red.');
	})
	it('should return #00ff00 for .5', () => {
		result = ColorPercent.getColor(colors, .5);
		t.equal(result, '#00ff00', 'Not green.');
	});
	it('should return #0000ff for 1', () => {
		result = ColorPercent.getColor(colors, 1);
		t.equal(result, "#0000ff");
	});
	it('should error with bad format', () => {
		t.doesNotThrow(() => {ColorPercent.getColor(["rgb(127, 127, 127)", "rgb(50%, 50%, 50%)"], .2)});
		t.doesNotThrow(() => {ColorPercent.getColor(["rgb(127, 127, 127)", "rgb(50%, 50%, 50%)"], .8)});
		t.throws(() => { ColorPercent.getColor(["#FFF", "walrus"], .9) });
	});
});