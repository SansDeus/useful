/**
 * 
 * @param array any[]
 * @param prop string
 * @param reverse boolean
 * @returns any[]
 */
export const Sorter = (array: Array<any>, prop: string, reverse: boolean = false) => {
	return array.sort((a, b) => ((a[prop] < b[prop]) ? (reverse ? 1 : -1) : (a[prop] > b[prop]) ? (reverse ? -1 : 1) : 0));
};
