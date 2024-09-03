import { RandomRange } from './randomrange';
/**
 * 
 * @returns hex string
 */
export const RandomColor = () => {
	const [r, g, b] = Array.apply(null, new Array(3)).map(() => RandomRange(0, 255));
	return `#${(1 << 24 | (r << 16) | (g << 8) | (b << 0)).toString(16).slice(1)}`;
}