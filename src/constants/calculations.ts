import {bodyInMedium} from '../types/bodyInMedium';
import { Fd } from '../constants/drag'; 

export const Mass = (p: number, l: number) => p * l;
export const Density = (m: number, l: number) => m / l;
export const Volume = (m: number, p: number) => m / p;
export const Drag = (viscosity: number) => (bodyInMedium: bodyInMedium) => {
	const { coefficient, velocity, area, reynolds } = bodyInMedium;
	return Fd(viscosity)({ Cd: coefficient, u: Math.cbrt(velocity), A: area, Re: reynolds });
}
