/**
 * 
 * @param start number
 * @param end number
 * @param percent number
 * @returns number
 */
export const Lerp = (start: number, end: number, percent: number) => start - ((start - end) * percent);
