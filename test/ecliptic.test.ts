import { assert as t } from 'chai';
import 'mocha';
import { Ecliptic } from '../src/ecliptic';
const dead = {x: 0, y: 0};
const coordinates = [
	{ x: 0, y: 50 },
	{ x: 50, y: 0 },
	{ x: 0, y: -50 },
	{ x: -50, y: -0 }
  ];

describe('Ecliptic', () => {
	describe('Degree', () => {
		it('270 degrees from center.', () => {
			t.equal(Ecliptic.Degree(dead, coordinates[0]), 270);
		});
		it('180 degrees from center.', () => {
			t.equal(Ecliptic.Degree(dead, coordinates[1]), 180);
		});
		it('90 degrees from center.', () => {
			t.equal(Ecliptic.Degree(dead, coordinates[2]), 90);
		});
	});

	describe('Radian', () => {
		it('-1.57 radians from center.', () => {
			t.equal(Ecliptic.Radian(dead, coordinates[0]), -1.5707963267948966);
		});
		it('3.14 degrees from center.', () => {
			t.equal(Ecliptic.Radian(dead, coordinates[1]), 3.141592653589793);
		});
		it('1.57 degrees from center.', () => {
			t.equal(Ecliptic.Radian(dead, coordinates[2]), 1.5707963267948966);
		});
	});

	describe('EqualDegrees', () => {
		it('Supply 30 degrees for 12 items', () => {
			t.equal(Ecliptic.EqualDegrees(12), 30);
		});
	});

	describe('EqualDegrees', () => {
		it('Supply .52 radians for 12 items', () => {
			t.equal(Ecliptic.EqualRadians(12), 0.5235987755982988);
		});
	});

	describe('LocationByDegree', () => {
		it('should return x: 0, y: -50', () => {
			t.deepEqual(Ecliptic.LocationByDegree(dead, 50, 180), coordinates[2]);
		});
	});

	describe('LocationByRadian', () => {
		it('should return x: 0, y: -50', () => {
			t.deepEqual(Ecliptic.LocationByRadian(dead, 50, 3.141592653589793), coordinates[2]);
		});
	});

	describe('ToDegree', () => {
		it('should return 180.', () => {
			t.equal(Ecliptic.ToDegree(3.141592653589793), 180);
		});
	});

	describe('ToRadian', () => {
		it('should return 180.', () => {
			t.equal(Ecliptic.ToRadian(180), 3.141592653589793);
		});
	});

	describe('Surround', () => {
		it('should give 4 coordinates around the initial coordinate', () => {
			t.deepEqual(Ecliptic.Surround(dead, 4, { distance: 50 }), coordinates);
			t.deepEqual(Ecliptic.Surround(dead, 4, { distance: 50, spacing: 15 }), [
				{ x: 0, y: 50 },
				{ x: 13, y: 48 },
				{ x: 25, y: 43 },
				{ x: 35, y: 35 }
			]);
			t.deepEqual(Ecliptic.Surround(dead, 1, { degree: 0, amplitudeX: .5, amplitudeY: .5 }), [
				{ x: 0, y: 0 }
			]);
		});
	});
});