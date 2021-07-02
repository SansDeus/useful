/**
 * 
 * @param p 
 * @param u 
 */
 export const q = (p: number, u: number) => .5 * p * Math.pow(u, 2);
 /**
	* 
	* @param u 
	* @param A 
	* @param v 
	*/
 export const Re = (u: number, A: number, v: number) => u * Math.sqrt(A) / v;
 /**
	* 
	* @param fd 
	* @param p 
	* @param u 
	* @param A 
	*/
 export const Cd = (fd: number, p: number, u: number, A: number) => fd / q(p, u) * A;
 /**
	* 
	* @param p 
	*/
 export const Fd = (p: number) => (o: { Cd: number, u: number, A: number, Re?: number }) => {
	 const fd = o.Cd * q(p, o.u) * o.A * (o.Re ?? 1);
	 return isNaN(fd) ? 0 : fd;
 };
