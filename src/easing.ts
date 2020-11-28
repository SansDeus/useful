import Bezier from "./bezier";
import randomItem from "./randomItem";

export class Easing {
	public static linear = Bezier([0.0, 0.0, 1.0, 1.0]);
	public static easeInSine = Bezier([0.47, 0, 0.745, 0.715]);
	public static easeOutSine = Bezier([0.39, 0.575, 0.565, 1]);
	public static easeInOutSine = Bezier([0.445, 0.05, 0.55, 0.95]);
	public static easeInQuad = Bezier([0.55, 0.085, 0.68, 0.53]);
	public static easeOutQuad = Bezier([0.25, 0.46, 0.45, 0.94]);
	public static easeInOutQuad = Bezier([0.455, 0.03, 0.515, 0.955]);
	public static easeInCubic = Bezier([0.55, 0.055, 0.675, 0.19]);
	public static easeOutCubic = Bezier([0.215, 0.61, 0.355, 1]);
	public static easeInOutCubic = Bezier([0.645, 0.045, 0.355, 1]);
	public static easeInQuart = Bezier([0.895, 0.03, 0.685, 0.22]);
	public static easeOutQuart = Bezier([0.165, 0.84, 0.44, 1]);
	public static easeInOutQuart = Bezier([0.77, 0, 0.175, 1]);
	public static easeInQuint = Bezier([0.755, 0.05, 0.855, 0.06]);
	public static easeOutQuint = Bezier([0.23, 1, 0.32, 1]);
	public static easeInOutQuint = Bezier([0.86, 0, 0.07, 1]);
	public static easeInExpo = Bezier([0.95, 0.05, 0.795, 0.035]);
	public static easeOutExpo = Bezier([0.19, 1, 0.22, 1]);
	public static easeInOutExpo = Bezier([1, 0, 0, 1]);
	public static easeInCirc = Bezier([0.6, 0.04, 0.98, 0.335]);
	public static easeOutCirc = Bezier([0.075, 0.82, 0.165, 1]);
	public static easeInOutCirc = Bezier([0.785, 0.135, 0.15, 0.86]);
	public static easeInBack = Bezier([0.6, -0.28, 0.735, 0.045]);
	public static easeOutBack = Bezier([0.175, 0.885, 0.32, 1.275]);
	public static easeInOutBack = Bezier([0.68, -0.55, 0.265, 1.55]);
	public static easeInElastic = (t: number) => (.04 - .04 / t) * Math.sin(25 * t) + 1;
	public static easeOutElastic = (t: number) => .04 * t / (--t) * Math.sin(25 * t);
	public static easeInOutElastic = (t: number) => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (0.02 - .01 / t) * Math.sin(50 * t) + 1;
	public static random = () => randomItem([
		Easing.easeInSine,       	Easing.easeOutSine,			Easing.easeInOutSine,    	Easing.easeInQuad,
		Easing.easeOutQuad,      	Easing.easeInOutQuad,		Easing.easeInCubic,     	Easing.easeOutCubic,
		Easing.easeInOutCubic,   	Easing.easeInQuart,			Easing.easeOutQuart,     	Easing.easeInOutQuart,
		Easing.easeInQuint,      	Easing.easeOutQuint,		Easing.easeInOutQuint,   	Easing.easeInExpo,
		Easing.easeOutExpo,      	Easing.easeInOutExpo,		Easing.easeInCirc,       	Easing.easeOutCirc,
		Easing.easeInOutCirc,    	Easing.easeInBack,			Easing.easeOutBack,      	Easing.easeInOutBack,
		Easing.easeInElastic,   	Easing.easeOutElastic,	Easing.easeInOutElastic,	Easing.linear
	]) as ((t: number) => number);
}
