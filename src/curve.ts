import { Decasteljau } from './decasteljau';
export const Curve = (points: { x: number, y: number }[], percent: number) => {
	return { 
		x: Decasteljau(points.map((p) => p.x), percent), 
		y: Decasteljau(points.map((p) => p.y), percent) 
	};
}
