import { StepInfo } from "./types/stepInfo";

export const calculateStep = <T>(items: T[], percent: number): StepInfo<T> => {
	percent = Math.max(Math.min(1, percent), 0);
	const progress = ((items.length - 1) * percent);
	const index = Math.floor(progress);
	const pct = (progress - index);
	return {
		percent: pct,
		current: items[index],
		next: percent === 1 ? items[index] : items[index + 1]
	};
}
