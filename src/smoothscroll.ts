import { Animate } from "./animate";
import { Easing } from "./easing";

export interface IScrollOptions {
	offsetY?: number;
	offsetX?: number;
	framesPerSecond?: number;
	duration?: number;
	easingFunc?: (t: number) => number;
	done?: () => void;
}

export class SmoothScroll {
	framesPerSecond = 60;
	duration = 300;

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

	getLocation(element: HTMLElement, options?: IScrollOptions) {
		return { 
			bounds: element.getBoundingClientRect(),
			currentY: window.pageYOffset,
			currentX: window.pageXOffset,
			offsetY: options ? options.offsetY || 0 : 0,
			offsetX: options ? options.offsetX || 0 : 0
		};
	}

	scroll(element: HTMLElement, options?: IScrollOptions) {
		this.disablePointerEvents();
		const easeFunc = options && options.easingFunc ? options.easingFunc : Easing.linear;
		const l = this.getLocation(element, options);
		const scroll = (pct: number) => {
			const bez = easeFunc(pct);
			window.scrollTo(
				l.offsetX + l.currentX + (l.bounds.left) * bez,
				l.offsetY + l.currentY + (l.bounds.top) * bez
			);
		};
		Animate(scroll, {
			fps: options && options.framesPerSecond ? options.framesPerSecond : this.framesPerSecond,
			duration: options && options.duration ? options.duration : this.duration, 
			cb: () => { 
				this.enablePointerEvents();
				if(options?.done) {
					options.done();
				}
			}
		}); 
	}
}
