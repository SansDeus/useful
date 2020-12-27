import { Lerp } from "./lerp";
export const Decasteljau = (points: number[], percent: number): number => {
	if (points.length === 1) return points[0];
	const results = [...points];
	const calc = (p: number[]): number => {
		for(let i = 0, e = p.length - 1; i < e; i++) results[i] = Lerp(p[i], p[i + 1], percent);
		results.pop();
		return results.length === 1 ? results[0] : calc(results);
	};
	return calc(results);
};