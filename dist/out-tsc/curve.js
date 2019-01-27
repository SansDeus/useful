import Decasteljau from './decasteljau';
export default (points, time) => {
    return {
        x: Decasteljau.calculate(points.map((p) => p.x), time),
        y: Decasteljau.calculate(points.map((p) => p.y), time)
    };
};
//# sourceMappingURL=curve.js.map