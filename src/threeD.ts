import Decasteljau from './decasteljau';
export const ThreeD = (points: { x: number, y: number, z: number }[], percent: number) => {
	return { 
		x: Decasteljau.calculate(points.map((p) => p.x), percent),
		y: Decasteljau.calculate(points.map((p) => p.y), percent),
		z: Decasteljau.calculate(points.map((p) => p.z), percent)
	};
}
