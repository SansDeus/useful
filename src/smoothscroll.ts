import { Animate } from './animate';
import { Easing } from './easing';

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
	private async enablePointerEvents() {
		const body = document.body;
		if (body.classList.contains("disable-hover")) {
			body.classList.remove("disable-hover");
		}
	}

	private async disablePointerEvents() {
		const body = document.body;
		if (!body.classList.contains("disable-hover")) {
			body.classList.add("disable-hover");
		}
	}

	/**
	 * 
	 * @param element HTMLElement
	 * @param options IScrollOptions
	 * @returns
	 */
	async getLocation(element: HTMLElement, options?: IScrollOptions) {
		return { 
			bounds: element.getBoundingClientRect(),
			currentY: window.pageYOffset,
			currentX: window.pageXOffset,
			offsetY: options ? options.offsetY || 0 : 0,
			offsetX: options ? options.offsetX || 0 : 0
		};
	}

	/**
	 * 
	 * @param element HTMLElement
	 * @param options IScrollOptions
	 */
	async scroll(element: HTMLElement, options?: IScrollOptions) {
		await this.disablePointerEvents();
		const easeFunc = options && options.easingFunc ? options.easingFunc : Easing.linear;
		const l = await this.getLocation(element, options);
		const scroll = async (pct: number) => {
			const bez = easeFunc(pct);
			window.scrollTo(
				l.offsetX + l.currentX + (l.bounds.left) * bez,
				l.offsetY + l.currentY + (l.bounds.top) * bez
			);
		};
		await Animate(scroll, {
			fps: options && options.framesPerSecond ? options.framesPerSecond : this.framesPerSecond,
			duration: options && options.duration ? options.duration : this.duration, 
			cb: async () => { 
				await this.enablePointerEvents();
				if(options?.done) {
					options.done();
				}
			}
		}); 
	}
}
