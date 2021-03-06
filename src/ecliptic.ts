import { ClampAngle } from './clampAngle';
import { coordinate } from './types/coordinate';

type htmlCoordinate = HTMLElement | coordinate;
type surroundOptions = { distance?: number, degree?: number, spacing?: number, amplitudeX?: number, amplitudeY?: number };

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

	/**
	 * Extracts a set transform coordinates
	 * @param elm HTMLElement
	 * @returns coordinate
	 */
	public static TransformCoordinates = (elm: HTMLElement): coordinate => {
		const coordRx = /(-?[\d\.]+)/g;
		const result = elm.style.transform.match(coordRx);
		return result ? { x: +result[0], y: +result[1] } : Ecliptic.deadXY;
	}

	private static itemCenter = (item: htmlCoordinate): coordinate => {
		if (!(item instanceof HTMLElement)) { return item; }
		if (item.style.transform) { return Ecliptic.deadXY; }
		const bounds = item.getBoundingClientRect();
		return { x: (bounds.width / 2), y: (bounds.height / 2) };
	}

	private static itemLocation = (item: htmlCoordinate): coordinate => {
		if (!(item instanceof HTMLElement)) { return item; }
		if (item.style.transform) { return Ecliptic.TransformCoordinates(item); }
		const bounds = item.getBoundingClientRect();
		return { x: bounds.left, y: bounds.top };
	}

	private static calcRadius = (item: htmlCoordinate, distance: number): number => {
		if (!(item instanceof HTMLElement)) { return distance; }
		const bounds = item.getBoundingClientRect();
		return distance === 0 ? Math.max(bounds.width, bounds.height) : distance;
	}

	private static surroundDefaults = (options?: surroundOptions) => {
		options ??= {};
		const { spacing, amplitudeX, amplitudeY } = options;
		const equal = typeof(spacing) === 'undefined';
		let { distance, degree } = options;
		distance ??= 0; degree ??= 0;
		return { distance, degree, spacing, equal, amplitudeX, amplitudeY };
	}

	private static rcr = (item: htmlCoordinate, childCount: number, distance: number) => {
		return {
			radians: Ecliptic.EqualRadians(childCount),
			center: Ecliptic.itemCenter(item),
			radius: Ecliptic.calcRadius(item, distance)
		};
	}

	private static htmlCollectionToArray = (items: HTMLCollection): HTMLElement[] => {
		return (Array.apply(null, new Array(items.length)) as HTMLElement[]).map((e, i) => {
			return items[i] as HTMLElement;
		});
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
	static LocationByRadian = (center: htmlCoordinate, radius: number, radian: number) => {
		center = (center instanceof HTMLElement) ? Ecliptic.itemLocation(center) : center;
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
	static LocationByDegree = (center: htmlCoordinate, radius: number, degree: number) => {
		const radian = Ecliptic.ToRadian(ClampAngle(degree, -360, 360));
		return Ecliptic.LocationByRadian(center, radius, radian);
	}

	/**
	 * 
	 * @param item coordinate
	 * @param amount number
	 * @param options surroundOptions
	 * @returns coordinate[]
	 */
	static Surround = (item: coordinate, amount: number, options?: surroundOptions): coordinate[] => {
		const { distance, degree, equal, spacing, amplitudeX, amplitudeY } = Ecliptic.surroundDefaults(options);
		const { radians, center, radius } = Ecliptic.rcr(item, amount, distance);
		const separation = Ecliptic.ToRadian(spacing ?? 0);
		const applyAmplitude = (amplitude: number | undefined, originPoint: number, destinationPoint: number) => {
			return typeof(amplitude) === 'undefined' ? destinationPoint : (originPoint * (1 - amplitude)) + (destinationPoint * amplitude);
		};
		let radian = Ecliptic.ToRadian(ClampAngle(degree, -360, 360));
		const results = Array.apply(null, new Array(amount)).map((o: unknown, i: number) => {
			const {x, y} = Ecliptic.LocationByRadian(center, radius, radian);
			radian += equal ? radians : separation;
			return {
				x: applyAmplitude(amplitudeX, item.x, x),
				y: applyAmplitude(amplitudeY, item.y, y)
			};
		});
		return results;
	}

	/**
	 * 
	 * @param item HTMLElement
	 * @param withItems HTMLElement[] | HTMLCollection
	 * @param options surroundOptions
	 */
	static SurroundHTML = (item: HTMLElement, withItems: HTMLElement[] | HTMLCollection, options: surroundOptions) => {
		const toPx = (val: number) => `${Math.floor(val)}px`;
		if (withItems instanceof HTMLCollection) { withItems = Ecliptic.htmlCollectionToArray(withItems); }
		Ecliptic.Surround(Ecliptic.itemCenter(item), withItems.length, options).forEach((c, i) => {
			(withItems[i] as HTMLElement).style.transform = `translate(${toPx(c.x)}, ${toPx(c.y)})`;
		});
	}
}
