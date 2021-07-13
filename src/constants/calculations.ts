import {bodyInMedium} from '../types/bodyInMedium';
import { Fd } from '../constants/drag'; 

/**
 * 
 * @param p number
 * @param l number
 * @returns number
 */
export const Mass = (p: number, l: number) => p * l;
/**
 * 
 * @param m number
 * @param l number
 * @returns number
 */
export const Density = (m: number, l: number) => m / l;
/**
 * 
 * @param m number
 * @param p number
 * @returns number
 */
export const Volume = (m: number, p: number) => m / p;
/**
 * 
 * @param viscosity number
 * @returns (bodyInMedium: bodyInMedium) => number
 */
export const Drag = (viscosity: number) => (bodyInMedium: bodyInMedium) => {
	const { coefficient, velocity, area, reynolds } = bodyInMedium;
	return Fd(viscosity)({ Cd: coefficient, u: Math.cbrt(velocity), A: area, Re: reynolds });
}
