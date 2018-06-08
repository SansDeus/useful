import Decasteljau from './decasteljau';
export default (points: { x: number, y: number }[], time: number) => {
	return { 
		x: Decasteljau.calculate(points.map((p) => p.x), time), 
		y: Decasteljau.calculate(points.map((p) => p.y), time) 
	};
}