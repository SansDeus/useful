import * as _ from "lodash";

export class Decasteljau {
	lerp = (start: number, end: number, time: number) => start * (1 - time) + end * time;

	calc(points: number[], time: number) {
		const result : number[] = [];
		for (let i = 0, j = points.length - 1; i < j; i++) {
			const current = points[i];
			const next = points[i + 1];
			result.push(this.lerp(current, next, time));
		}
		if (result.length === 1) return result[0];
		return this.calc(result, time);
	}

	create2D(points: { left: number, top: number }[], time: number) {
		const xArray = this.calc(_.map(points, (p) => p.left), time);
		const yArray = this.calc(_.map(points, (p) => p.top), time);
		return { left: xArray, top: yArray };
	}

}