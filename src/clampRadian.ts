import { Clamp } from './clamp';

export const ClampRadian = (radian: number, min: number, max: number) => {
	const tao = Math.PI * 2;
	if (radian < -tao) { radian += tao; }
	if (radian > tao) { radian -= tao; }
	return Clamp(radian, min, max);
}