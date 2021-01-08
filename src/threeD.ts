import { Decasteljau } from './decasteljau';
import { coordinate3d } from './interfaces/coordinate';
export const ThreeD = (points: coordinate3d[], percent: number) => {
	return { 
		x: Decasteljau(points.map((p) => p.x), percent),
		y: Decasteljau(points.map((p) => p.y), percent),
		z: Decasteljau(points.map((p) => p.z), percent)
	};
}
