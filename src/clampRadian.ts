import { Clamp } from './clamp';

export const ClampRadian = (radian: number, min: number, max: number) => {
	const tau = Math.PI * 2;
	if (radian < -tau) { radian += tau; }
	if (radian > tau) { radian -= tau; }
	return Clamp(radian, min, max);
}