import { Lerp } from "./lerp";
export const Decasteljau = (points: number[], percent: number): number => {
	let result = points.map((n, i) => {
		return i !== points.length ? Lerp(n, points[i + 1], percent) : NaN;
	}).slice(0, points.length - 1);
	return result.length === 1 ? result[0] : Decasteljau(result, percent);
};