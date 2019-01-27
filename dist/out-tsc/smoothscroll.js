import Animate from "./animate";
import { Bezier } from "./bezier";
import { Easing } from "./easing";
export class SmoothScroll {
    constructor() {
        this.framesPerSecond = 60;
        this.duration = .3;
        this.bezier = new Bezier();
        this.easing = new Easing();
    }
    //	.disable-hover {
    //		pointer-events: none;
    //	}
    enablePointerEvents() {
        const body = document.body;
        if (body.classList.contains("disable-hover")) {
            body.classList.remove("disable-hover");
        }
    }
    disablePointerEvents() {
        const body = document.body;
        if (!body.classList.contains("disable-hover")) {
            body.classList.add("disable-hover");
        }
    }
    scroll(element, options) {
        this.disablePointerEvents();
        const easeFunc = options && options.easingFunc ? options.easingFunc : this.easing.linear;
        const bounds = element.getBoundingClientRect();
        const currentY = window.pageYOffset;
        const currentX = window.pageXOffset;
        const offsetY = options ? options.offsetY || 0 : 0;
        const offsetX = options ? options.offsetX || 0 : 0;
        const scroll = (pct) => {
            const bez = easeFunc(pct);
            window.scrollTo(offsetX + currentX + ((bounds.left + currentX) - currentX) * bez, offsetY + currentY + ((bounds.top + currentY) - currentY) * bez);
        };
        Animate(scroll, options && options.framesPerSecond ? options.framesPerSecond : this.framesPerSecond, options && options.duration ? options.duration : this.duration, this.enablePointerEvents);
    }
}
//# sourceMappingURL=smoothscroll.js.map