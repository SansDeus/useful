# Useful

Contains:
- lerp (linear interpolation), animation, bezier algorithm, color percent, decasteljau algorithm, decasteljau curves, easing, smooth scrolling, three dimensional curves.

## Animate 
*Animate*(action: (pct: number) => void , options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void });
```
import {Animate, Easing} from 'ts-useful';
function scoot(elm: HTMLElement, x: number): void {
  const move = (pct: number) => {
    elm.style.left = `${Easing.linear(pct)}px`;
  }
  Animate(move, { fps: 60, duration: 3000 });
}
```
## Bezier
*Bezier*(number[]) returns (percentage: number) => number;
```
import {Bezier} from 'ts-useful';
bezier = Bezier([0.0, 0.0, 1.0, 1.0]);
bezier(.2);
```
## Clamp, ClampAngle, ClampRadian
These functions will make sure a number stays between the min and max values.
*Clamp*(amount: number, min: number, max: number);
*ClampAngle*(amount: number, min: number, max: number);
*ClampRadian*(amount: number, min: number, max: number);

## ColorPercent
*ColorPercent.getColor*(colorList: string[], percent: number);
```
import {ColorPercent} from 'ts-useful';
ColorPercent.getColor(['#FF00FF', '#889900', '#336699'], .45);
```
## Curves
*Curves*(points: { x: number, y: number }[], percent: number)
```
import {Curves} from 'ts-useful';
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

*Random is a little different.*
const easing = Easing.random();
easing(.03);
```
*Easing types include:* linear, inSine, outSine, inOutSine, inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic, inQuart, outQuart, inOutQuart, inQuint, outQuint, inOutQuint, inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc, inBack, outBack, inOutBack, inElastic, outElastic, inOutElastic, random.

## Ecliptic
Class to allow placing items at coordinates based on an HTMLElement or coordinate { x: number, y: number }
For the surround function place any surrounding items as children of the original item and give them a css position: absolute;
*Ecliptic.Surround*(item: htmlCoordinate, withItems: HTMLElement[] | HTMLCollection, options: surroundOptions);
*Ecliptic.LocationByDegree*(center: htmlCoordinate, radius: number, degree: number);
*surroundOptions*: { distance?: number, degree?: number, spacing?: number };
Distance is the radius from the center/point, degree is the item offset around the parent, spacing will place the items the number of degrees away.
```
const parent = document.getElementById('toSurround');
const kids = document.getElementsByClassName('childItems');
Ecliptic.Surround(parent, kids, { degree: 90, distance: 120 });
Ecliptic.LocationByDegree(parent, 100, 180);
```

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
