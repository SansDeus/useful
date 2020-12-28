import { Clamp } from './clamp';
export const ClampAngle = (angle: number, min: number, max: number) => {
	return Clamp(angle % 360, min, max);
}