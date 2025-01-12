# Useful

Contains:
- lerp (linear interpolation), animation, bezier algorithm, clamp, clampAngle, clampRadian, color percent, ecliptic, decasteljau algorithm, decasteljau curves, easing, smooth scrolling, three dimensional curves.

## Animate 
*Animate*(action: (pct: number) => void , options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void });
```
*Not available for commonjs libraries.*
import {Animate, Easing} from 'ts-useful';
function scoot(elm: HTMLElement, x: number): void {
  const move = (pct: number) => {
    elm.style.left = `${x * Easing.linear(pct)}px`;
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
## Boids
*Boids*(options?: boidOptions);\
Method: Update() => coordinates[];
```
import {Boids} from 'ts-useful';
const boids = new Boids({ boids: 2 });
or
const boids = new Boids({ boids: [{ position: {x: 10, y: 10}, speed: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 } }] });

boids.Update();
```
## Clamp, ClampAngle, ClampRadian
These functions will make sure a number stays between the min and max values.\
*Clamp*(amount: number, min: number, max: number);\
*ClampAngle*(amount: number, min: number, max: number);\
*ClampRadian*(amount: number, min: number, max: number);
```
import {Clamp, ClampAngle, ClampRadian} from 'ts-useful';
Clamp(8000, 0, 10);
ClampAngle(45, 0, 90);
ClampRadian(2, 0, 3);
```
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
*Decasteljau*(points: number[], percent: number) 
```
import {Decasteljau} from 'ts-useful';
Decasteljau([1,2,3,4,5,6,7,10], .22);
```
## Easing
Static easing functions.
```
import {Easing} from 'ts-useful';
const easing = Easing.linear;
easing(.03);
*or*
Easing.linear(.03);
```
*Random is a little different.*
Easing.random() should be placed outside iterative code otherwise you'll get erratic results from a new easing on every iteration.
```
import {Easing} from 'ts-useful';
const easing = Easing.random();
easing(.03);
```
*Easing types include:* linear, sineIn, sineOut, sineInOut, quadIn, quadOut, quadInOut, cubicIn, cubicOut, cubicInOut, quartIn, quartOut, quartInOut, quintIn, quintOut, quintInOut, expoIn, expoOut, expoInOut, circIn, circOut, circInOut, backIn, backOut, backInOut, boomerang, elasticIn, elasticOut, elasticInOut, bounceIn, bounceOut, bounceInOut, and random.

## Ecliptic
Class to allow placing items at coordinates based on an HTMLElement or coordinate { x: number, y: number }\
This function uses transform for performance as it will not cause a repaint of the screen.\
For best results give the parent HTMLElement this style - transform-origin: 50% 50%;\
Give the child HTMLElements these styles - transform-origin: 50% 50%; top: 50%; left: 50%; position: absolute;
```
Ecliptic.Degree(origin: coordinates, target: coordinates);
Ecliptic.Radian(origin: coordinates, target: coordinates);

Ecliptic.EqualRadians(count: number);
Ecliptic.EqualDegrees(count: number);

Ecliptic.LocationByDegree(center: htmlCoordinate, radius: number, degree: number);
Ecliptic.LocationByRadian(center: htmlCoordinate, radius: number, radian: number);

Ecliptic.ToDegree(radian: number);
Ecliptic.ToRadian(degree: number);

Ecliptic.TransformCoordinates(elm: HTMLElement);

Ecliptic.Surround(item: coordinate, amount: number, options: surroundOptions);
Ecliptic.SurroundHTML(item: htmlCoordinate, withItems: HTMLElement[] | HTMLCollection, options: surroundOptions);

type coordinate = { x: number, y: number };
type htmlCoordinate = HTMLElement | coordinate;
type surroundOptions = { distance?: number, degree?: number, spacing?: number, amplitudeX?: number, amplitudeY?: number };
```
Example Use:
```
import {Ecliptic} from 'ts-useful';

const parent = document.getElementById('toSurround');
const kids = document.getElementsByClassName('childItems');
Ecliptic.SurroundHTML(parent, kids, { degree: 90, distance: 120 });
Ecliptic.LocationByDegree(parent, 100, 180);
```
## GravityVector (depricated. Renamed to PhysicsVector)
*PhysicsVector*(options: { position: coordinate, gravity: number, mass: number, distanceClamp: { min: number, max: number } });\
Extends Vector class.\
*Methods*\
attract(target: PhysicsVector);\
applyForce(force: PhysicsVector);\
update();\
*Properties*: velocity: Vector, acceleration: Vector;
```
const gv1 = new PhysicsVector();
const gv2 = new PhysicsVector({ position: { x: 50, y: 50 } });
const force = gv1.attract(gv2);
gv2.applyForce(f);
gv2.update();
```
## Lerp
*Lerp*(start: number, end: number, percent: number)
```
import {Lerp} from 'ts-useful';
Lerp(-600, 600, .5);
```
## MobiusIndex
MobiusIndex(length: number, index: number)\
If index is negative, it will return the last item and beyond.\
If index is greater than length, it will wrap to the first item and beyond.
```
import {MobiusIndex} from 'ts-useful';
MobiusIndex(3, 0); // Output: 0;
MobiusIndex(3, 1); // Output: 1;
MobiusIndex(3, 2); // Output: 2;
MobiusIndex(3, 3); // Output: 0;
MobiusIndex(3, 4); // Output: 1;
MobiusIndex(3, -1); // Output: 2;
```
## RandomRange
*RandomRange*(min: number, max: number)
```
import {RandomRange} from 'ts-useful';
RandomRange(0, 100);
```
## RandomItem
*RandomItem*(array: any[])
```
import {RandomItem} from 'ts-useful';
RandomItem([1,2,5]);
```
## SmoothScroll
```
import {SmoothScroll} from 'ts-useful';
const smoothScroll = new SmoothScroll();
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
```
import {Sorter} from 'ts-useful';
const array = [{ 'foo': 1, bar: '2' }, { 'foo': '2', bar: '1' }];
Sorter(array, 'bar');
```
## Swipe
```
import {Swipe} from 'ts-useful';
const swipe = new Swipe(element: HTMLElement, events?: ISwipeEvents);
swipe.(events: ISwipeEvents);
swipe.Destroy();
 
ISwipeEvents {
  left?: () => void;
  right?: () => void;
  up?: () => void;
  down?: () => void;
}
```
## ThreeD
*ThreeD*(points: { x: number, y: number, z: number }[], percent: number)
```
import {ThreeD} from 'ts-useful';
const locations = ThreeD([{ x: 0, y: 0, z: 0}, { x: 10, y: 10, z: 10}], .5);
```
## WeylRnd
*WeylRnd*(seed: number | undefined)
*Methods*:\
Shuffle(Array)\
nextInt32(range?:[number, number]): number\
nextInt31(): number\
nextNumber(): number\
nextNumber53(): number
```
import {WeylRng} from 'ts-useful';
const randomNumber = new WeylRng(20);
const randomized = randomNumber.Shuffle(['one', 'two', 'three', 'four', 'five', 'six', 'seven']);
const fromRange = randomNumber.nextInt32([2, 100]);
```
## Vector
*Vector*(coordinate?: coordinate);\
*Methods*:\
add(coordinate: coordinate)\
subtract(coordinate: coordinate)\
multiply(amount: number)\
divide(amount: number)\
normalize()\
set(coordinate: coordinate)\
zero()\
*Properties*: hypotenuse: number, magnitude: number;
```
import {Vector} from 'ts-useful';
const vector = new Vector();
vector.add({ x: 50, y: 50 }).multiply(2);

```
## Testing
Command to install dependencies, run tests, and clean up after itself.
```
npm run test
```