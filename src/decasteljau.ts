import lerp from "./lerp";
const Decasteljau = {
	calculate (points: number[], time: number) {
		const result : number[] = [];
		for (let i = 0, j = points.length - 1; i < j; i++) {
			result.push(lerp(points[i], points[i + 1], time));
		}
		if (result.length === 1) return result[0];
		return this.calculate(result, time);
	}
}
export default Decasteljau;