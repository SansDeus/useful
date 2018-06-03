import Decasteljau from './decasteljau';

export default (points: { x: number, y: number, z: number }[], time: number) => {
	const xArray = Decasteljau(points.map((p) => p.x), time);
	const yArray = Decasteljau(points.map((p) => p.y), time);
	const sizeArray = Decasteljau(points.map((p) => p.z), time);
	return { x: xArray, y: yArray, z: sizeArray };
}
