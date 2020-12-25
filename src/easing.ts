import { Bezier } from "./bezier";
import { RandomItem } from "./randomItem";

export class Easing {
	public static linear = Bezier([0.0, 0.0, 1.0, 1.0]);
	public static inSine = Bezier([0.47, 0, 0.745, 0.715]);
	public static outSine = Bezier([0.39, 0.575, 0.565, 1]);
	public static inOutSine = Bezier([0.445, 0.05, 0.55, 0.95]);
	public static inQuad = Bezier([0.55, 0.085, 0.68, 0.53]);
	public static outQuad = Bezier([0.25, 0.46, 0.45, 0.94]);
	public static inOutQuad = Bezier([0.455, 0.03, 0.515, 0.955]);
	public static inCubic = Bezier([0.55, 0.055, 0.675, 0.19]);
	public static outCubic = Bezier([0.215, 0.61, 0.355, 1]);
	public static inOutCubic = Bezier([0.645, 0.045, 0.355, 1]);
	public static inQuart = Bezier([0.895, 0.03, 0.685, 0.22]);
	public static outQuart = Bezier([0.165, 0.84, 0.44, 1]);
	public static inOutQuart = Bezier([0.77, 0, 0.175, 1]);
	public static inQuint = Bezier([0.755, 0.05, 0.855, 0.06]);
	public static outQuint = Bezier([0.23, 1, 0.32, 1]);
	public static inOutQuint = Bezier([0.86, 0, 0.07, 1]);
	public static inExpo = Bezier([0.95, 0.05, 0.795, 0.035]);
	public static outExpo = Bezier([0.19, 1, 0.22, 1]);
	public static inOutExpo = Bezier([1, 0, 0, 1]);
	public static inCirc = Bezier([0.6, 0.04, 0.98, 0.335]);
	public static outCirc = Bezier([0.075, 0.82, 0.165, 1]);
	public static inOutCirc = Bezier([0.785, 0.135, 0.15, 0.86]);
	public static inBack = Bezier([0.6, -0.28, 0.735, 0.045]);
	public static outBack = Bezier([0.175, 0.885, 0.32, 1.275]);
	public static inOutBack = Bezier([0.68, -0.55, 0.265, 1.55]);
	public static inElastic = (t: number) => (.04 - .04 / t) * Math.sin(25 * t) + 1;
	public static outElastic = (t: number) => .04 * t / (--t) * Math.sin(25 * t);
	public static inOutElastic = (t: number) => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (0.02 - .01 / t) * Math.sin(50 * t) + 1;
	public static random = () => RandomItem([
		Easing.inSine,       	Easing.outSine,			Easing.inOutSine,    	Easing.inQuad,
		Easing.outQuad,      	Easing.inOutQuad,		Easing.inCubic,     	Easing.outCubic,
		Easing.inOutCubic,   	Easing.inQuart,			Easing.outQuart,     	Easing.inOutQuart,
		Easing.inQuint,      	Easing.outQuint,		Easing.inOutQuint,   	Easing.inExpo,
		Easing.outExpo,      	Easing.inOutExpo,		Easing.inCirc,       	Easing.outCirc,
		Easing.inOutCirc,    	Easing.inBack,			Easing.outBack,      	Easing.inOutBack,
		Easing.inElastic,   	Easing.outElastic,	Easing.inOutElastic,	Easing.linear
	]) as ((t: number) => number);
}
