import { Decasteljau } from './decasteljau';
import { coordinate } from './interfaces/coordinate';
export const Curve = (points: coordinate[], percent: number) => {
	return { 
		x: Decasteljau(points.map((p) => p.x), percent), 
		y: Decasteljau(points.map((p) => p.y), percent) 
	};
}
