/**
 * 
 * @param min number
 * @param max number
 * @returns number
 */
export const RandomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;