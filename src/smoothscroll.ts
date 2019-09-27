import Animate from "./animate";
import { Easing } from "./easing";

export interface IScrollOptions {
	offsetY?: number;
	offsetX?: number;
	framesPerSecond?: number;
	duration?: number;
	easingFunc?: (t: number) => number;
}

export class SmoothScroll {
	framesPerSecond = 60;
	duration = .3;
	private easing = new Easing();

	//	.disable-hover {
	//		pointer-events: none;
	//	}
	private enablePointerEvents() {
		const body = document.body;
		if (body.classList.contains("disable-hover")) {
			body.classList.remove("disable-hover");
		}
	}

	private disablePointerEvents() {
		const body = document.body;
		if (!body.classList.contains("disable-hover")) {
			body.classList.add("disable-hover");
		}
	}

	scroll(element: HTMLElement, options?: IScrollOptions) {
		this.disablePointerEvents();
		const easeFunc = options && options.easingFunc ? options.easingFunc : this.easing.linear;
		const bounds = element.getBoundingClientRect();
		const currentY = window.pageYOffset;
		const currentX = window.pageXOffset;
		const offsetY = options ? options.offsetY || 0 : 0;
		const offsetX = options ? options.offsetX || 0 : 0;
		const scroll = (pct: number) => {
			const bez = easeFunc(pct);
			window.scrollTo(
				offsetX + currentX + ((bounds.left + currentX) - currentX) * bez,
				offsetY + currentY + ((bounds.top + currentY) - currentY) * bez
			);
		};
		Animate(scroll, {
			fps: options && options.framesPerSecond ? options.framesPerSecond : this.framesPerSecond,
			speed: options && options.duration ? options.duration : this.duration, 
			cb: this.enablePointerEvents});
	}
}
