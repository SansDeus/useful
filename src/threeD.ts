import { Decasteljau } from './decasteljau';
import { ICoordinate3d } from './interfaces/ICoordinate3d';
export const ThreeD = (points: ICoordinate3d[], percent: number) => {
	return { 
		x: Decasteljau(points.map((p) => p.x), percent),
		y: Decasteljau(points.map((p) => p.y), percent),
		z: Decasteljau(points.map((p) => p.z), percent)
	};
}
