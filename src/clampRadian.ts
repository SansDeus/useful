import { Clamp } from './clamp';
/**
 * 
 * @param radian number
 * @param min number
 * @param max number
 * @returns number
 */
export const ClampRadian = (radian: number, min: number, max: number) => {
	const tau = Math.PI * 2;
	return Clamp(radian % tau, min, max);
}