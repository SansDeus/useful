import Decasteljau from './decasteljau';

export default (points: { x: number, y: number }[], time: number) => {
	const xArray = Decasteljau(points.map((p) => p.x), time);
	const yArray = Decasteljau(points.map((p) => p.y), time);
	return { x: xArray, y: yArray };
}