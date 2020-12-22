type StepInfo = { percent: number, current: string, next: string };
interface Array<T> {
	calculateStep(percent: number): StepInfo;	
}

if (!Array.prototype.calculateStep) {
	Array.prototype.calculateStep =
		function (percent: number): StepInfo {
			percent = Math.max(Math.min(1, percent), 0);
			const progress = ((this.length - 1) * percent);
			const index = Math.floor(progress);
			const pct = (progress - index);
			return {
				percent: pct,
				current: this[index],
				next: percent === 1 ? this[index] : this[index + 1]
			};
		}
}