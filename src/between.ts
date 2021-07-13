/**
 * 
 * @param compare number
 * @param range { min: number, max: number }
 * @returns boolean
 */
export const Between = (compare: number, range: { min: number, max: number}) : boolean => compare >= Math.min(range.min, range.max) && compare <= Math.max(range.min, range.max);
