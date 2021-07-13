/**
 * 
 * @param length number
 * @param index number
 * @returns number
 */
export const MobiusIndex = (length: number, index: number) => ((index % length) + length) % length;
