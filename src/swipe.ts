export interface ISwipeEvents {
	left?: () => void;
	right?: () => void;
	up?: () => void;
	down?: () => void;
}

export class Swipe {
	private x1: number;
	private y1: number;
	private swipeEvents: ISwipeEvents;
	private elm: HTMLElement;
	private supportsPassive = false;
	private defaultSwipe = { left: () => {}, right: () => {}, up: () => {}, down: () => {}};

	private handleTouchStart(event: TouchEvent) {
		event.preventDefault();
		const initTouch = event.touches[0];
		this.x1 = initTouch.clientX;
		this.y1 = initTouch.clientY;
	}

	private handleTouchMove(event: TouchEvent) {
		event.preventDefault();
		if (!this.x1 || !this.y1) { return; }
		const nowTouch = event.touches[0];
		const [x2, y2] = [nowTouch.clientX, nowTouch.clientY];
		const [xDiff, yDiff] = [this.x1 - x2, this.y1 - y2];
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) { this.swipeEvents.left(); } else { this.swipeEvents.right(); }
		} else {
			if (yDiff > 0) { this.swipeEvents.up(); } else { this.swipeEvents.down(); }
		}
		[this.x1, this.y1] = [null, null];
	}

	private assignSwipe(events: ISwipeEvents) {
		return {
			left: !events.left ? this.defaultSwipe.left : events.left,
			right: !events.right ? this.defaultSwipe.right : events.right,
			up: !events.up ? this.defaultSwipe.up : events.up,
			down: !events.down ? this.defaultSwipe.down : events.down
		};
	}

	private passiveTest() {
		try {
			const opts = Object.defineProperty({}, 'passive', {
				get: function() {
				this.supportsPassive = true;
				}
			});
			window.addEventListener('testPassive', null, opts);
			window.removeEventListener('testPassive', null, opts);
		} catch (e) {}
	}

	Destroy() {
		if (this.elm) {
			this.elm.removeEventListener('touchstart', this.handleTouchStart, { capture: false });
			this.elm.removeEventListener('touchmove', this.handleTouchMove, { capture: false });	
		}
	}

	SetSwipe(events: ISwipeEvents) {
		this.swipeEvents = this.assignSwipe(events);
	}

	constructor(element: HTMLElement, events?: ISwipeEvents) {
		this.passiveTest();
		this.swipeEvents = events ? this.assignSwipe(events) : this.defaultSwipe;
		this.elm = element;
		this.elm.addEventListener('touchstart', (e) => this.handleTouchStart(e), this.supportsPassive ? { passive: true } : false);
		this.elm.addEventListener('touchmove', (e) => this.handleTouchMove(e), this.supportsPassive ? { passive: true } : false);
	}
}
