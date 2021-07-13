import { Clamp } from './clamp';
/**
 * 
 * @param angle number
 * @param min number
 * @param max number
 * @returns number
 */
export const ClampAngle = (angle: number, min: number, max: number) => {
	return Clamp(angle % 360, min, max);
}