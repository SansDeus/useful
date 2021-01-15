import { Bezier } from "./bezier";
import { RandomItem } from "./randomItem";

export class Easing {
	public static linear = Bezier([0.0, 0.0, 1.0, 1.0]);
	public static sineIn = Bezier([0.47, 0, 0.745, 0.715]);
	public static sineOut = Bezier([0.39, 0.575, 0.565, 1]);
	public static sineInOut = Bezier([0.445, 0.05, 0.55, 0.95]);
	public static quadIn = Bezier([0.55, 0.085, 0.68, 0.53]);
	public static quadOut = Bezier([0.25, 0.46, 0.45, 0.94]);
	public static quadInOut = Bezier([0.455, 0.03, 0.515, 0.955]);
	public static cubicIn = Bezier([0.55, 0.055, 0.675, 0.19]);
	public static cubicOut = Bezier([0.215, 0.61, 0.355, 1]);
	public static cubicInOut = Bezier([0.645, 0.045, 0.355, 1]);
	public static quartIn = Bezier([0.895, 0.03, 0.685, 0.22]);
	public static quartOut = Bezier([0.165, 0.84, 0.44, 1]);
	public static quartInOut = Bezier([0.77, 0, 0.175, 1]);
	public static quintIn = Bezier([0.755, 0.05, 0.855, 0.06]);
	public static quintOut = Bezier([0.23, 1, 0.32, 1]);
	public static quintInOut = Bezier([0.86, 0, 0.07, 1]);
	public static expoIn = Bezier([0.95, 0.05, 0.795, 0.035]);
	public static expoOut = Bezier([0.19, 1, 0.22, 1]);
	public static expoInOut = Bezier([1, 0, 0, 1]);
	public static circIn = Bezier([0.6, 0.04, 0.98, 0.335]);
	public static circOut = Bezier([0.075, 0.82, 0.165, 1]);
	public static circInOut = Bezier([0.785, 0.135, 0.15, 0.86]);
	public static backIn = Bezier([0.6, -0.28, 0.735, 0.045]);
	public static backOut = Bezier([0.175, 0.885, 0.32, 1.275]);
	public static backInOut = Bezier([0.68, -0.55, 0.265, 1.55]);
	public static boomerang = (t: number) => ((t >= .5) ? 1 - t : t) * 2;
	public static elasticIn = (t: number) => (.04 - .04 / t) * Math.sin(25 * t) + 1;
	public static elasticOut = (t: number) => .04 * t / (--t) * Math.sin(25 * t);
	public static elasticInOut = (t: number) => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (0.02 - .01 / t) * Math.sin(50 * t) + 1;
	// Refactored from https://easings.net/#easeOutBounce
	public static bounceOut = (t: number): number => {
		const [n1, d1] = [7.5625, 2.75];
		return (t < 1 / d1) ? n1 * t * t 
			: (t < 2 / d1) ? n1 * (t -= 1.5 / d1) * t + 0.75 
			: (t < 2.5 / d1) ? n1 * (t -= 2.25 / d1) * t + 0.9375 
			: n1 * (t -= 2.625 / d1) * t + 0.984375;
	}
	public static bounceIn = (t: number): number => 1 - Easing.bounceOut(1 - t);
	public static bounceInOut = (t: number): number => t < 0.5 ? (1 - Easing.bounceOut(1 - 2 * t)) / 2 : (1 + Easing.bounceOut(2 * t - 1)) / 2;
	public static random = () => RandomItem([
		Easing.backIn,		Easing.backInOut,			Easing.backOut, 		Easing.bounceIn,	Easing.bounceInOut,	Easing.bounceOut,
		Easing.circIn,		Easing.circInOut,			Easing.circOut,			Easing.cubicIn,		Easing.cubicInOut,	Easing.cubicOut,
		Easing.elasticIn,	Easing.elasticInOut,	Easing.elasticOut,	Easing.expoIn,		Easing.expoInOut,		Easing.expoOut,
		Easing.linear,		Easing.boomerang,
		Easing.quadIn,		Easing.quadInOut,			Easing.quadOut,			Easing.quartIn,		Easing.quartInOut,	Easing.quartOut,
		Easing.quintIn,		Easing.quintInOut,		Easing.quintOut,		Easing.sineIn,		Easing.sineInOut,		Easing.sineOut,
	]) as ((t: number) => number);
}
