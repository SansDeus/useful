# Useful

Contains:
- lerp (linear interpolation), animation, bezier algorithm, color percent, decasteljau algorithm, decasteljau curves, easing, smooth scrolling, three dimensional curves.

## Animate 
*Animate*(action: (pct: number) => void, options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void })

## Bezier
const bezier = new Bezier();
bezier.create(mX1: number, mY1: number, mX2: number, mY2: number)

## ColorPercent
const colorPercent = new ColorPercent();
colorPercent.getColor(colorList: string[], percent: number)

## Curves
Curves(points: { x: number, y: number }[], percent: number)

## Decasteljau
Decasteljau.calculate(points: number[], percent: number) 

## Easing
This can be called either by the easing type or by name.
const easing = new Easing();
    easing.getEasing("linear");
*or*
const easing = new Easing().linear;

*Easing types include:* linear, easeInSine, easeOutSine, easeInOutSine, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc, easeInBack, easeOutBack, easeInOutBack, easeInElastic, easeOutElastic, easeInOutElastic, random.

## Lerp
*Lerp*(start: number, end: number, percent: number)

## RandomRange
RandomRange(min: number, max: number)

## SmoothScroll
const smoothScroll = new SmoothScroll() 
smoothScroll.scroll(element: HTMLElement, options?: IScrollOptions)

IScrollOptions {
	offsetY?: number;
	offsetX?: number;
	framesPerSecond?: number;
	duration?: number;
	easingFunc?: (t: number) => number;
}

## Sorter
sorter(array: Array<any>, prop: string, reverse: boolean = false)

## Swipe
const swipe = new Swipe(element: HTMLElement, events?: ISwipeEvents);
swipe.(events: ISwipeEvents)
swipe.Destroy()

ISwipeEvents {
	left?: () => void;
	right?: () => void;
	up?: () => void;
	down?: () => void;
}

## ThreeD
ThreeD(points: { x: number, y: number, z: number }[], percent: number)
