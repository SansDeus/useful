import { Bezier } from "./bezier";
import RandomRange from "./randomrange";
export class Easing {
    constructor() {
        this.bezier = new Bezier();
        this.easingList = ["linear", "easeInSine", "easeOutSine", "easeInOutSine", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc", "easeInBack", "easeOutBack", "easeInOutBack", "easeInElastic", "easeOutElastic", "easeInOutElastic"];
        this.easings = {
            linear: [0.0, 0.0, 1.0, 1.0],
            easeInSine: [0.47, 0, 0.745, 0.715],
            easeOutSine: [0.39, 0.575, 0.565, 1],
            easeInOutSine: [0.445, 0.05, 0.55, 0.95],
            easeInQuad: [0.55, 0.085, 0.68, 0.53],
            easeOutQuad: [0.25, 0.46, 0.45, 0.94],
            easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
            easeInCubic: [0.55, 0.055, 0.675, 0.19],
            easeOutCubic: [0.215, 0.61, 0.355, 1],
            easeInOutCubic: [0.645, 0.045, 0.355, 1],
            easeInQuart: [0.895, 0.03, 0.685, 0.22],
            easeOutQuart: [0.165, 0.84, 0.44, 1],
            easeInOutQuart: [0.77, 0, 0.175, 1],
            easeInQuint: [0.755, 0.05, 0.855, 0.06],
            easeOutQuint: [0.23, 1, 0.32, 1],
            easeInOutQuint: [0.86, 0, 0.07, 1],
            easeInExpo: [0.95, 0.05, 0.795, 0.035],
            easeOutExpo: [0.19, 1, 0.22, 1],
            easeInOutExpo: [1, 0, 0, 1],
            easeInCirc: [0.6, 0.04, 0.98, 0.335],
            easeOutCirc: [0.075, 0.82, 0.165, 1],
            easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
            easeInBack: [0.6, -0.28, 0.735, 0.045],
            easeOutBack: [0.175, 0.885, 0.32, 1.275],
            easeInOutBack: [0.68, -0.55, 0.265, 1.55]
        };
        this.linear = this.getEasing("linear");
        this.easeInSine = this.getEasing("easeInSine");
        this.easeOutSine = this.getEasing("easeOutSine");
        this.easeInOutSine = this.getEasing("easeInOutSine");
        this.easeInQuad = this.getEasing("easeInQuad");
        this.easeOutQuad = this.getEasing("easeOutQuad");
        this.easeInOutQuad = this.getEasing("easeInOutQuad");
        this.easeInCubic = this.getEasing("easeInCubic");
        this.easeOutCubic = this.getEasing("easeOutCubic");
        this.easeInOutCubic = this.getEasing("easeInOutCubic");
        this.easeInQuart = this.getEasing("easeInQuart");
        this.easeOutQuart = this.getEasing("easeOutQuart");
        this.easeInOutQuart = this.getEasing("easeInOutQuart");
        this.easeInQuint = this.getEasing("easeInQuint");
        this.easeOutQuint = this.getEasing("easeOutQuint");
        this.easeInOutQuint = this.getEasing("easeInOutQuint");
        this.easeInExpo = this.getEasing("easeInExpo");
        this.easeOutExpo = this.getEasing("easeOutExpo");
        this.easeInOutExpo = this.getEasing("easeInOutExpo");
        this.easeInCirc = this.getEasing("easeInCirc");
        this.easeOutCirc = this.getEasing("easeOutCirc");
        this.easeInOutCirc = this.getEasing("easeInOutCirc");
        this.easeInBack = this.getEasing("easeInBack");
        this.easeOutBack = this.getEasing("easeOutBack");
        this.easeInOutBack = this.getEasing("easeInOutBack");
        this.easeInElastic = (t) => (.04 - .04 / t) * Math.sin(25 * t) + 1;
        this.easeOutElastic = (t) => .04 * t / (--t) * Math.sin(25 * t);
        this.easeInOutElastic = (t) => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (0.02 - .01 / t) * Math.sin(50 * t) + 1;
        this.random = this.getEasing("random");
    }
    getEasing(name) {
        switch (name.toLowerCase()) {
            case "easeinelastic":
                return this.easeInElastic;
            case "easeoutelastic":
                return this.easeOutElastic;
            case "easeinoutelastic":
                return this.easeInOutElastic;
            case "random":
                const easing = this.easingList[RandomRange(0, this.easingList.length - 1)];
                return this.bezier.create.apply(this.bezier, this.easings[easing]);
            default:
                const values = this.easings.hasOwnProperty(name) ? this.easings[name] : this.easings["linear"];
                return this.bezier.create.apply(this.bezier, values);
        }
    }
}
//# sourceMappingURL=easing.js.map