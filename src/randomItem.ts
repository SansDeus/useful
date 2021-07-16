import { RandomRange } from './randomrange';
/**
 * 
 * @param array any[]
 * @returns any
 */
export const RandomItem = (array: any[]): any => array[RandomRange(0, array.length - 1)];
