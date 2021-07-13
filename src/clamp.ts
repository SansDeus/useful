/**
 * 
 * @param value number
 * @param min number
 * @param max number
 * @returns number
 */
export const Clamp = (value: number, min: number, max: number) => Math.min(Math.max(min, value), max);