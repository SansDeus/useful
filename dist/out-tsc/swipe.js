export class Swipe {
    constructor(element, events) {
        this.defaultSwipe = { left: () => { }, right: () => { }, up: () => { }, down: () => { } };
        this.swipeEvents = events ? this.assignSwipe(events) : this.defaultSwipe;
        this.elm = element;
        this.elm.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        this.elm.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);
    }
    handleTouchStart(event) {
        event.preventDefault();
        const initTouch = event.touches[0];
        this.x1 = initTouch.clientX;
        this.y1 = initTouch.clientY;
    }
    handleTouchMove(event) {
        event.preventDefault();
        if (!this.x1 || !this.y1) {
            return;
        }
        const nowTouch = event.touches[0];
        const [x2, y2] = [nowTouch.clientX, nowTouch.clientY];
        const [xDiff, yDiff] = [this.x1 - x2, this.y1 - y2];
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.swipeEvents.left();
            }
            else {
                this.swipeEvents.right();
            }
        }
        else {
            if (yDiff > 0) {
                this.swipeEvents.up();
            }
            else {
                this.swipeEvents.down();
            }
        }
        [this.x1, this.y1] = [null, null];
    }
    assignSwipe(events) {
        return {
            left: !events.left ? this.defaultSwipe.left : events.left,
            right: !events.right ? this.defaultSwipe.right : events.right,
            up: !events.up ? this.defaultSwipe.up : events.up,
            down: !events.down ? this.defaultSwipe.down : events.down
        };
    }
    Destroy() {
        this.elm.removeEventListener('touchstart', this.handleTouchStart, { capture: false });
        this.elm.removeEventListener('touchmove', this.handleTouchMove, { capture: false });
    }
    SetSwipe(events) {
        this.swipeEvents = this.assignSwipe(events);
    }
}
//# sourceMappingURL=swipe.js.map