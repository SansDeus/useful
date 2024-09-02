import { Ecliptic } from "./ecliptic";
import { coordinate } from "./types";
import { surroundOptions } from "./types/surroundOptions";

export class EclipticHTML {
	static htmlCenter = (item: HTMLElement): coordinate => {
		if (item.style.transform) { return { x: 0, y: 0 }; }
		const bounds = item.getBoundingClientRect();
		return { x: (bounds.width / 2), y: (bounds.height / 2) };
	}
	
	static itemLocation = (item: HTMLElement): coordinate => {
		if (item.style.transform) { return EclipticHTML.TransformCoordinates(item); }
		const bounds = item.getBoundingClientRect();
		return { x: bounds.left, y: bounds.top };
	}
	
	static calcRadius = (item: HTMLElement, distance: number): number => {
		const bounds = item.getBoundingClientRect();
		return distance === 0 ? Math.max(bounds.width, bounds.height) : distance;
	}
	
	/**
	 * Extracts a set transform coordinates
	 * @param elm HTMLElement
	 * @returns coordinate
	 */
	public static TransformCoordinates = (elm: HTMLElement): coordinate => {
		const coordRx = /(-?[\d\.]+)/g;
		const result = elm.style.transform.match(coordRx);
		return result ? { x: +result[0], y: +result[1] } : { x: 0, y: 0 };
	}	

	private static htmlCollectionToArray = (items: HTMLCollection): HTMLElement[] => {
		return (Array.apply(null, new Array(items.length)) as HTMLElement[]).map((e, i) => {
			return items[i] as HTMLElement;
		});
	}

	/**
 * 
 * @param item HTMLElement
 * @param withItems HTMLElement[] | HTMLCollection
 * @param options surroundOptions
 */
	static SurroundHTML = (item: HTMLElement, withItems: HTMLElement[] | HTMLCollection, options: surroundOptions) => {
		const toPx = (val: number) => `${Math.floor(val)}px`;
		if (withItems instanceof HTMLCollection) { withItems = EclipticHTML.htmlCollectionToArray(withItems); }
		Ecliptic.Surround(EclipticHTML.htmlCenter(item), withItems.length, options).forEach((c, i) => {
			(withItems[i] as HTMLElement).style.transform = `translate(${toPx(c.x)}, ${toPx(c.y)})`;
		});
	}
}
