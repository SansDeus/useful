export const sigma = (num: number, index: number, x: number = 1) => {
	let sum = 0;
	for (let i = index, e = num; i <= e; i++) {
		sum += x * i;
	}
	return sum;
}