import lerp from "./lerp";
const Decasteljau = {
    calculate(points, time) {
        let result = [points.length - 1];
        for (let i = 0, j = points.length - 1; i < j; i++) {
            result[i] = lerp(points[i], points[i + 1], time);
        }
        if (result.length === 1) {
            const value = result[0];
            result = null;
            return value;
        }
        return this.calculate(result, time);
    }
};
export default Decasteljau;
//# sourceMappingURL=decasteljau.js.map