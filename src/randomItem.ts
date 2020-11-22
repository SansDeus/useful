import RandomRange from './randomrange';
export default (array: any[]): any => {
	return array[RandomRange(0, array.length - 1)];
};