import lerp from "./lerp";

export class Decasteljau {
	calc(points: number[], time: number) {
		const result : number[] = [];
		for (let i = 0, j = points.length - 1; i < j; i++) {
			result.push(lerp(points[i], points[i + 1], time));
		}
		if (result.length === 1) return result[0];
		return this.calc(result, time);
	}

	create2D(points: { left: number, top: number }[], time: number) {
		const xArray = this.calc(points.map((p) => p.left), time);
		const yArray = this.calc(points.map((p) => p.top), time);
		return { left: xArray, top: yArray };
	}

	create3D(points: { left: number, top: number, size: number }[], time: number) {
		const xArray = this.calc(points.map((p) => p.left), time);
		const yArray = this.calc(points.map((p) => p.top), time);
		const sizeArray = this.calc(points.map((p) => p.size), time);
		return { left: xArray, top: yArray, size: sizeArray };
	}

}