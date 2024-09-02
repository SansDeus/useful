import { ClampAngle } from './clampAngle';
import { coordinate } from './types/coordinate';
import { surroundOptions } from './types/surroundOptions';

export class Ecliptic {
	private static deadXY = { x: 0, y: 0 };
	private static tau = Math.PI * 2;
	private static deg2Rad = Ecliptic.tau / 360;
	/**
	 * 
	 * @param count number
	 * @returns number
	 */
	static EqualRadians = (count: number) => Ecliptic.tau / count;
	/**
	 * 
	 * @param count number
	 * @returns number
	 */
	static EqualDegrees = (count: number) => 360 / count;
	/**
	 * 
	 * @param radian number
	 * @returns number
	 */
	static ToDegree = (radian: number) => (radian >= 0 ? radian : (Ecliptic.tau + radian)) * 360 / Ecliptic.tau;
	/**
	 * 
	 * @param degree number
	 * @returns number
	 */
	static ToRadian = (degree: number) => degree * Ecliptic.deg2Rad;

	private static surroundDefaults = (options?: surroundOptions) => {
		options ??= {};
		const { spacing, amplitudeX, amplitudeY } = options;
		const equal = typeof(spacing) === 'undefined';
		let { distance, degree } = options;
		distance ??= 0; degree ??= 0;
		return { distance, degree, spacing, equal, amplitudeX, amplitudeY };
	}

	/**
	 * 
	 * @param origin coordinate
	 * @param target coordinate
	 * @returns number
	 */
	static Radian = (origin: coordinate, target: coordinate) => {
		const [dx, dy] = [origin.x - target.x, origin.y - target.y];
		return Math.atan2(dy, dx);
	}

	/**
	 * 
	 * @param origin coordinate
	 * @param target coordinate
	 * @returns number
	 */
	static Degree = (origin: coordinate, target: coordinate) => {
		return Ecliptic.ToDegree(Ecliptic.Radian(origin, target));
	}

	/**
	 * 
	 * @param center HTMLElement | coordinate
	 * @param radius number
	 * @param radian number
	 * @returns coordinate
	 */
	static LocationByRadian = (center: coordinate, radius: number, radian: number) => {
		return {
			x: Math.round(center.x + radius * Math.sin(radian)),
			y: Math.round(center.y + radius * Math.cos(radian))
		};
	}

	/**
	 * 
	 * @param center HTMLElement | coordinate
	 * @param radius number
	 * @param degree number
	 * @returns coordinate
	 */
	static LocationByDegree = (center: coordinate, radius: number, degree: number) => {
		const radian = Ecliptic.ToRadian(ClampAngle(degree, -360, 360));
		return Ecliptic.LocationByRadian(center, radius, radian);
	}

	/**
	 * 
	 * @param center coordinate
	 * @param amount number
	 * @param options surroundOptions
	 * @returns coordinate[]
	 */
	static Surround = (center: coordinate, amount: number, options?: surroundOptions): coordinate[] => {
		const { distance, degree, equal, spacing, amplitudeX, amplitudeY } = Ecliptic.surroundDefaults(options);
		const radians = Ecliptic.EqualRadians(amount);
		const separation = Ecliptic.ToRadian(spacing ?? 0);
		const applyAmplitude = (amplitude: number | undefined, originPoint: number, destinationPoint: number) => {
			return typeof(amplitude) === 'undefined' ? destinationPoint : (originPoint * (1 - amplitude)) + (destinationPoint * amplitude);
		};
		let radian = Ecliptic.ToRadian(ClampAngle(degree, -360, 360));
		const results = Array.apply(null, new Array(amount)).map((o: unknown, i: number) => {
			const {x, y} = Ecliptic.LocationByRadian(center, distance, radian);
			radian += equal ? radians : separation;
			return {
				x: applyAmplitude(amplitudeX, center.x, x),
				y: applyAmplitude(amplitudeY, center.y, y)
			};
		});
		return results;
	}

}
