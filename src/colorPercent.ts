import { ColorVect } from './abstract/colorVect';
import { Clamp } from './clamp';
import { tau } from './constants';
import './extensions/calculateStep'; 
import { Lerp } from './lerp';
import { vector3 } from './types/vector3';

type rxCompare = { regex: RegExp, converter: (e: any) => number[] };
export class ColorPercent {
	private static regexArray: rxCompare[] = [
		// #a0b1c2
		{ regex: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i, 
			converter: (e: RegExpExecArray) => [parseInt(e[1].toString(), 16), parseInt(e[2].toString(), 16), parseInt(e[3].toString(), 16)] },
		// #fff
		{ regex: /#([a-f0-9])([a-f0-9])([a-f0-9])/i,
			converter: (e: RegExpExecArray) => [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] },
		// rgb(num,num,num)
		{ regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, 
			converter: (e: RegExpExecArray) => [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] },
		// rgb(num%,num%,num%)
		{ regex: /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/, 
			converter: (e: RegExpExecArray) => [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55] }
	];

	private static getRgb = (color: string) : number[] =>
	{
		const rxc = ColorPercent.regexArray.find((rx: rxCompare) => rx.regex.test(color));
		if(rxc) return rxc.converter(rxc.regex.exec(color));
		throw new Error(`getRgb Invalid color: ${color}`);
	}

	static colorDecToHex = (r: number, g: number, b: number) => `#${(1 << 24 | (r << 16) | (g << 8) | (b << 0)).toString(16).slice(1)}`;

	/**
	 * 
	 * @param colorList string[]: ['#ff0000', '#0000FF']
	 * @param percent number: .03
	 * @returns hex color.
	 */
	static getColor = (colorList: string[], percent: number) => {
		const stepInfo = colorList.calculateStep(percent);
		const color = (position: number) => {
			const [startColor, endColor] = [ColorPercent.getRgb(stepInfo.current), ColorPercent.getRgb(stepInfo.next)];
			return Math.floor(Lerp(startColor[position], endColor[position], stepInfo.percent));
		};
		return ColorPercent.colorDecToHex(color(0), color(1), color(2));
	}

	static makePalette = (t: number, a: vector3, b: vector3, c: vector3, d: vector3): string => {
		const calced: vector3 = <vector3> ColorVect.multiplyBy(ColorVect.multiply(c, ColorVect.addBy(d, t)), tau).map((v) => {
			return Math.cos(v);
		});
		let rgb = ColorVect.multiply(ColorVect.add(a, b), calced).map((v) => Clamp(Math.abs(v), 0, 1));
		return this.colorDecToHex(rgb[0], rgb[1], rgb[2]);
	}

	static lighen = (color: string, percent: number) => {
		return ColorPercent.getColor([color, '#FFFFFF'], percent);
	}

	static darken = (color: string, percent: number) => {
		return ColorPercent.getColor([color, '#000000'], percent);
	}
}
