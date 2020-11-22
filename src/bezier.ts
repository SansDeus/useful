/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
export default (values: number[]) => {
	const newtonIterations = 4;
	const newtonMinSlope = 0.001;
	const subdivisionPrecision = 0.0000001;
	const subdivisionMaxIterations = 10;
	const kSplineTableSize = 11;
	const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	const A = (aA1: number, aA2: number) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
	const B = (aA1: number, aA2: number) => 3.0 * aA2 - 6.0 * aA1;
	const C = (aA1: number) => 3.0 * aA1;
	const float32ArraySupported = () => typeof Float32Array === "function";
	const calcBezier = (aT: number, aA1: number, aA2: number) => ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	const getSlope = (aT: number, aA1: number, aA2: number) => 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);

	const binarySubdivide = (aX: number, aA: number, aB: number, mX1: number, mX2: number) => {
		let currentX: number;
		let currentT: number;
		let i = 0;

		do {
			currentT = aA + (aB - aA) / 2.0;
			currentX = calcBezier(currentT, mX1, mX2) - aX;
			if (currentX > 0.0) {
				aB = currentT;
			} else {
				aA = currentT;
			}
		} while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
		return currentT;
	}

	const newtonRaphsonIterate = (aX: number, aGuessT: number, mX1: number, mX2: number) => {
		for (let i = 0; i < newtonIterations; ++i) {
			const currentSlope = getSlope(aGuessT, mX1, mX2);
			if (currentSlope === 0.0) {
				return aGuessT;
			}
			const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	}

	const create = (coords: number[]): ((t: number) => number) => {
		const [mX1, mY1, mX2, mY2] = coords;
		const sampleValues = float32ArraySupported()
			? new Float32Array(kSplineTableSize)
			: new Array(kSplineTableSize);

		if (mX1 !== mY1 || mX2 !== mY2) {
			for (let i = 0; i < kSplineTableSize; ++i) {
				sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
			}
		}

		const getTForX = (aX: number) => {
			let intervalStart = 0.0;
			let currentSample = 1;
			const lastSample = kSplineTableSize - 1;
			for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
				intervalStart += kSampleStepSize;
			}
			--currentSample;
			const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
			const guessForT = intervalStart + dist * kSampleStepSize;
			const initialSlope = getSlope(guessForT, mX1, mX2);
			if (initialSlope >= newtonMinSlope) {
				return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
			} else if (initialSlope === 0.0) {
				return guessForT;
			} else {
				return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
			}
		};
		return (x: number) => {
			if (mX1 === mY1 && mX2 === mY2) return x;
			if (x === 0) return 0;
			if (x === 1) return 1;
			return calcBezier(getTForX(x), mY1, mY2);
		}
	}
	return create(values);
}
