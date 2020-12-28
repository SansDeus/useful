import { Clamp } from './clamp';
export const ClampRadian = (radian: number, min: number, max: number) => {
	const tau = Math.PI * 2;
	return Clamp(radian % tau, min, max);
}