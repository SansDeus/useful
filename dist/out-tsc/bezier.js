/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
export class Bezier {
    constructor() {
        this.newtonIterations = 4;
        this.newtonMinSlope = 0.001;
        this.subdivisionPrecision = 0.0000001;
        this.subdivisionMaxIterations = 10;
        this.kSplineTableSize = 11;
        this.kSampleStepSize = 1.0 / (this.kSplineTableSize - 1.0);
        this.A = (aA1, aA2) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
        this.B = (aA1, aA2) => 3.0 * aA2 - 6.0 * aA1;
        this.C = (aA1) => 3.0 * aA1;
        this.float32ArraySupported = () => typeof Float32Array === "function";
        this.calcBezier = (aT, aA1, aA2) => ((this.A(aA1, aA2) * aT + this.B(aA1, aA2)) * aT + this.C(aA1)) * aT;
        this.getSlope = (aT, aA1, aA2) => 3.0 * this.A(aA1, aA2) * aT * aT + 2.0 * this.B(aA1, aA2) * aT + this.C(aA1);
        this.binarySubdivide = (aX, aA, aB, mX1, mX2) => {
            let currentX;
            let currentT;
            let i = 0;
            do {
                currentT = aA + (aB - aA) / 2.0;
                currentX = this.calcBezier(currentT, mX1, mX2) - aX;
                if (currentX > 0.0) {
                    aB = currentT;
                }
                else {
                    aA = currentT;
                }
            } while (Math.abs(currentX) > this.subdivisionPrecision && ++i < this.subdivisionMaxIterations);
            return currentT;
        };
        this.newtonRaphsonIterate = (aX, aGuessT, mX1, mX2) => {
            for (let i = 0; i < this.newtonIterations; ++i) {
                const currentSlope = this.getSlope(aGuessT, mX1, mX2);
                if (currentSlope === 0.0) {
                    return aGuessT;
                }
                const currentX = this.calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        };
    }
    create(mX1, mY1, mX2, mY2) {
        const sampleValues = this.float32ArraySupported()
            ? new Float32Array(this.kSplineTableSize)
            : new Array(this.kSplineTableSize);
        if (mX1 !== mY1 || mX2 !== mY2) {
            for (let i = 0; i < this.kSplineTableSize; ++i) {
                sampleValues[i] = this.calcBezier(i * this.kSampleStepSize, mX1, mX2);
            }
        }
        const getTForX = (aX) => {
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
            }
            else if (initialSlope === 0.0) {
                return guessForT;
            }
            else {
                return this.binarySubdivide(aX, intervalStart, intervalStart + this.kSampleStepSize, mX1, mX2);
            }
        };
        return (x) => {
            if (mX1 === mY1 && mX2 === mY2)
                return x;
            if (x === 0)
                return 0;
            if (x === 1)
                return 1;
            return this.calcBezier(getTForX(x), mY1, mY2);
        };
    }
}
//# sourceMappingURL=bezier.js.map