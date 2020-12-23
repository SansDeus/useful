import { Clamp } from './clamp';

export const ClampAngle = (angle: number, min: number, max: number) => {
	if (angle < -360) { angle += 360; }
	if (angle > 360) { angle -= 360; }
	return Clamp(angle, min, max);
}