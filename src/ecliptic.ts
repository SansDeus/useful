type coordinate = { x: number, y: number };
type htmlCoordinate = HTMLElement | coordinate;
type surroundOptions = { distance?: number, degree?: number, spacing?: number, amplitudeX?: number, amplitudeY?: number };

export class Ecliptic {
	private static deadXY = { x: 0, y: 0 };
	private static tau = Math.PI * 2;
	private static deg2Rad = Ecliptic.tau / 360;
	static EqualRadians = (count: number) => Ecliptic.tau / count;
	static EqualDegrees = (count: number) => 360 / count;

	public static TransformCoordinates = (elm: HTMLElement) => {
		const coordRx = /([\d\.]+)/g;
		const result = elm.style.transform.match(coordRx);
		return result ? { x: +result[0], y: +result[1] } : Ecliptic.deadXY;
	}

	private static itemCenter = (item: htmlCoordinate) => {
		if (!(item instanceof HTMLElement)) { return item; }
		if (item.style.transform) { return Ecliptic.deadXY; }
		const bounds = item.getBoundingClientRect();
		return { x: (bounds.width / 2), y: (bounds.height / 2) };
	}

	private static itemLocation = (item: htmlCoordinate) => {
		if (!(item instanceof HTMLElement)) { return item; }
		if (item.style.transform) { return Ecliptic.TransformCoordinates(item); }
		const bounds = item.getBoundingClientRect();
		return { x: bounds.left, y: bounds.top };
	}

	private static calcRadius = (item: htmlCoordinate, distance: number = 0) => {
		if (!(item instanceof HTMLElement)) { return distance; }
		const bounds = item.getBoundingClientRect();
		return distance === 0 ? Math.max(bounds.width, bounds.height) : distance;
	}

	private static surroundDefaults = (options: surroundOptions) => {
		let { distance, degree, amplitudeX, amplitudeY } = options;
		const { spacing } = options;
		const equal = typeof(spacing) === 'undefined';
		distance ??= 0; degree ??= 0;
		amplitudeX ??= 1, amplitudeY ??= 1;
		return { distance, degree, spacing, equal, amplitudeX, amplitudeY };
	}

	private static rcr = (item: htmlCoordinate, childCount: number, distance: number = 0) => {
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

	static LocationByRadian = (center: htmlCoordinate, radius: number, radian: number) => {
		center = (center instanceof HTMLElement) ? Ecliptic.itemLocation(center) : center;
		return {
			x: Math.round(center.x + radius * Math.sin(radian)),
			y: Math.round(center.y + radius * Math.cos(radian))
		};
	}

	static LocationByDegree = (center: htmlCoordinate, radius: number, degree: number) => {
		const radian = degree * Ecliptic.deg2Rad;
		return Ecliptic.LocationByRadian(center, radius, radian);
	}

	static Surround = (item: htmlCoordinate, withItems: HTMLElement[] | HTMLCollection, options: surroundOptions) => {
		const toPx = (val: number) => `${Math.floor(val)}px`;
		const { distance, degree, equal, spacing, amplitudeX, amplitudeY } = Ecliptic.surroundDefaults(options);
		const { radians, center, radius } = Ecliptic.rcr(item, withItems.length, distance);
		const separation = (spacing ?? 0) * Ecliptic.deg2Rad;
		let radian = degree * Ecliptic.deg2Rad;
		if (withItems instanceof HTMLCollection) { withItems = Ecliptic.htmlCollectionToArray(withItems); }
		withItems.forEach((e: HTMLElement, i: number): void => {
			const {x, y} = Ecliptic.LocationByRadian(center, radius, radian);
			e.style.transform = `translate(${toPx(x * amplitudeX)}, ${toPx(y * amplitudeY)})`;
			radian += equal ? radians : separation;
		});
	}
}
