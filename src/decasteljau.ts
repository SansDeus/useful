import { Lerp } from "./lerp";
export const Decasteljau = (points: number[], percent: number): number => {
	if (points.length === 1) return points[0];
	const results = [...points].map((p, i) => i !== points.length ? Lerp(points[i], points[i + 1], percent) : NaN).slice(0, points.length - 1);
	return Decasteljau(results, percent);
};