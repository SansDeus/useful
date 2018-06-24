/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
export class Bezier {
	private newtonIterations = 4;
	private newtonMinSlope = 0.001;
	private subdivisionPrecision = 0.0000001;
	private subdivisionMaxIterations = 10;
	private kSplineTableSize = 11;
	private kSampleStepSize = 1.0 / (this.kSplineTableSize - 1.0);
	private A = (aA1: number, aA2: number) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
	private B = (aA1: number, aA2: number) => 3.0 * aA2 - 6.0 * aA1;
	private C = (aA1: number) => 3.0 * aA1;
	private float32ArraySupported = () => typeof Float32Array === "function";
	private calcBezier = (aT: number, aA1: number, aA2: number) => ((this.A(aA1, aA2) * aT + this.B(aA1, aA2)) * aT + this.C(aA1)) * aT;
	private getSlope = (aT: number, aA1: number, aA2: number) => 3.0 * this.A(aA1, aA2) * aT * aT + 2.0 * this.B(aA1, aA2) * aT + this.C(aA1);

	private binarySubdivide = (aX: number, aA: number, aB: number, mX1: number, mX2: number) => {
		let currentX: number;
		let currentT: number;
		let i = 0;

		do {
			currentT = aA + (aB - aA) / 2.0;
			currentX = this.calcBezier(currentT, mX1, mX2) - aX;
			if (currentX > 0.0) {
				aB = currentT;
			} else {
				aA = currentT;
			}
		} while (Math.abs(currentX) > this.subdivisionPrecision && ++i < this.subdivisionMaxIterations);
		return currentT;
	}

	private newtonRaphsonIterate = (aX: number, aGuessT: number, mX1: number, mX2: number) => {
		for (let i = 0; i < this.newtonIterations; ++i) {
			const currentSlope = this.getSlope(aGuessT, mX1, mX2);
			if (currentSlope === 0.0) {
				return aGuessT;
			}
			const currentX = this.calcBezier(aGuessT, mX1, mX2) - aX;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	}

	create(mX1: number, mY1: number, mX2: number, mY2: number) {
		const sampleValues = this.float32ArraySupported()
			? new Float32Array(this.kSplineTableSize)
			: new Array(this.kSplineTableSize);

		if (mX1 !== mY1 || mX2 !== mY2) {
			for (let i = 0; i < this.kSplineTableSize; ++i) {
				sampleValues[i] = this.calcBezier(i * this.kSampleStepSize, mX1, mX2);
			}
		}

		const getTForX = (aX: number) => {
			let intervalStart = 0.0;
			let currentSample = 1;
			const lastSample = this.kSplineTableSize - 1;
			for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
				intervalStart += this.kSampleStepSize;
			}
			--currentSample;
			const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
			const guessForT = intervalStart + dist * this.kSampleStepSize;
			const initialSlope = this.getSlope(guessForT, mX1, mX2);
			if (initialSlope >= this.newtonMinSlope) {
				return this.newtonRaphsonIterate(aX, guessForT, mX1, mX2);
			} else if (initialSlope === 0.0) {
				return guessForT;
			} else {
				return this.binarySubdivide(aX, intervalStart, intervalStart + this.kSampleStepSize, mX1, mX2);
			}
		};

		return (x: number) => {
			if (mX1 === mY1 && mX2 === mY2) return x;
			if (x === 0) return 0;
			if (x === 1) return 1;
			return this.calcBezier(getTForX(x), mY1, mY2);
		}
	}
}
