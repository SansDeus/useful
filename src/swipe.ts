export interface ISwipeEvents {
	left?: () => void;
	right?: () => void;
	up?: () => void;
	down?: () => void;
}

export class Swipe {
	private x1: number | null = 0;
	private y1: number | null = 0;
	private swipeEvents: ISwipeEvents;
	private elm: HTMLElement;
	private defaultSwipe = { left: () => {}, right: () => {}, up: () => {}, down: () => {}};

	private handleTouchStart(event: TouchEvent) {
		const initTouch = event.touches[0];
		this.x1 = initTouch.clientX;
		this.y1 = initTouch.clientY;
	}

	private handleTouchMove(event: TouchEvent) {
		if (!this.x1 || !this.y1) { return; }
		const nowTouch = event.touches[0];
		const [x2, y2] = [nowTouch.clientX, nowTouch.clientY];
		const [xDiff, yDiff] = [this.x1 - x2, this.y1 - y2];
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) { this.swipeEvents.left ? this.swipeEvents.left() : () => {}; } 
			else { this.swipeEvents.right ? this.swipeEvents.right() : () => {}; }
		} else {
			if (yDiff > 0) { this.swipeEvents.up ? this.swipeEvents.up() : () => {}; } 
			else { this.swipeEvents.down ? this.swipeEvents.down() : () => {}; }
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
		this.swipeEvents = events ? this.assignSwipe(events) : this.defaultSwipe;
		this.elm = element;
		this.elm.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true } );
		this.elm.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true } );
	}
}
