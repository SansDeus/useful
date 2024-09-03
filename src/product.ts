/**
 * 
 * @param num 
 * @param index 
 * @param addend 
 * @returns number
 */
export const product = (num: number, index: number, addend: number = 1) => {
	let prod = 1;
	for (let i = index, e = num; i <= e; i++) {
		prod *= addend * i;
	}
	return prod;
}