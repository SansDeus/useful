import lerp from "./lerp";
const Decasteljau = {
	calculate (points: number[], percent: number): number {
		let result : number[] = [points.length - 1];
		for (let i = 0, j = points.length - 1; i < j; i++) {
			result[i] = lerp(points[i], points[i + 1], percent);
		}
		if (result.length === 1) {
			const value = result[0];
			result = [];
			return value;
		}
		return this.calculate(result, percent);
	}
}
export default Decasteljau;
