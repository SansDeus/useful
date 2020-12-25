import { Lerp } from "./lerp";
export const Decasteljau = (points: number[], percent: number): number => {
	let result = points.map((n, i) => {
		return i !== points.length ? Lerp(n as number, points[i + 1] as number, percent) : undefined;
	}).filter(r => r) as number[];
	return result.length === 1 ? result[0] : Decasteljau(result, percent);
};