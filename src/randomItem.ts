import {RandomRange} from './randomrange';
export const RandomItem = (array: any[]): any => array[RandomRange(0, array.length - 1)];
