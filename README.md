# Useful

Contains:
- lerp (linear interpolation), animation, bezier algorithm, color percent, decasteljau algorithm, decasteljau curves, easing, smooth scrolling, three dimensional curves.

## Animate 
*Animate*(action: (pct: number) => void , options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void });
```
import {Animate, Easing} from "ts-useful";
function scoot(elm: HTMLElement, x: number): void {
  const move = (pct: number) => {
    elm.style.left = \`${Easing.linear(pct)}px\`;
  }
  Animate(move, { fps: 60, duration: 3000 });
}
```
## Bezier
*Bezier*(number[]) returns (percentage: number) => number;
```
import {Bezier} from "ts-useful";
bezier = Bezier([0.0, 0.0, 1.0, 1.0]);
bezier(.2);
```
## ColorPercent
*ColorPercent.getColor*(colorList: string[], percent: number);
```
import {ColorPercent} from "ts-useful";
ColorPercent.getColor(['#FF00FF', '#889900', '#336699'], .45);
```
## Curves
*Curves*(points: { x: number, y: number }[], percent: number)
```
import {Curves} from "ts-useful";
const points = [
  { x: 10, y: 0 },
  { x: 30, y: 30 },
  { x: 45, y: 10 },
  { x: 20, y: 50 }
];
Curves(points, .4);
```
## Decasteljau
*Decasteljau.calculate*(points: number[], percent: number) 
```
import {Decasteljau} from 'ts-useful';
Decasteljau.calculate([1,2,3,4,5,6,7,10], .22);
```
## Easing
Class of static functions all of type: (t: number) => number
```
const easing = Easing.linear;
easing(.03);
*or*
Easing.linear(.03);
```
*Easing types include:* linear, easeInSine, easeOutSine, easeInOutSine, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc, easeInBack, easeOutBack, easeInOutBack, easeInElastic, easeOutElastic, easeInOutElastic, random.

## Lerp
*Lerp*(start: number, end: number, percent: number)

## RandomRange
*RandomRange*(min: number, max: number)

## RandomItem
*RandomItem*(array: any[])

## SmoothScroll
```
const smoothScroll = new SmoothScroll() 
smoothScroll.scroll(element: HTMLElement, options?: IScrollOptions);
 
IScrollOptions {
  offsetY?: number;
  offsetX?: number;
  framesPerSecond?: number;
  duration?: number;
  easingFunc?: (t: number) => number;
  done?: () => void;
}
```
## Sorter
*Sorter*(array: Array<any>, prop: string, reverse: boolean = false)

## Swipe
```
const swipe = new Swipe(element: HTMLElement, events?: ISwipeEvents);
swipe.(events: ISwipeEvents)
swipe.Destroy()
 
ISwipeEvents {
  left?: () => void;
  right?: () => void;
  up?: () => void;
  down?: () => void;
}
```
## ThreeD
*ThreeD*(points: { x: number, y: number, z: number }[], percent: number)
