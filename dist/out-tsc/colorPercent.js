import "./extensions/calculateStep";
export class ColorPercent {
    constructor() {
        this.regexArray = [
            // Look for #a0b1c2
            { regex: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i,
                converter: (e) => [parseInt(e[1].toString(), 16), parseInt(e[2].toString(), 16), parseInt(e[3].toString(), 16)] },
            // Look for #fff
            { regex: /#([a-f0-9])([a-f0-9])([a-f0-9])/i,
                converter: (e) => [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] },
            // Look for rgb(num,num,num)
            { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                converter: (e) => [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] },
            // Look for rgb(num%,num%,num%)
            { regex: /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/,
                converter: (e) => [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55] }
        ];
        this.getRgb = (color) => {
            if (color && Array.isArray(color) && color.length === 3) {
                return color;
            }
            if (typeof color === "string") {
                const regexIndex = this.regexArray.findIndex((rx) => rx.regex.test(color));
                return (regexIndex > -1) ? this.regexArray[regexIndex].converter(this.regexArray[regexIndex].regex.exec(color)) : null;
            }
            return null;
        };
        this.getColor = (colorList, percent) => {
            const stepInfo = colorList.calculateStep(percent);
            const color = (position) => Math.floor(this.getRgb(stepInfo.startIndex)[position] * (stepInfo.lowpct) +
                this.getRgb(stepInfo.endIndex)[position] * (stepInfo.highpct));
            const colorDecToHex = (r, g, b) => `#${(1 << 24 | (r << 16) | (g << 8) | (b << 0)).toString(16).substring(1)}`;
            return colorDecToHex(color(0), color(1), color(2));
        };
    }
}
//# sourceMappingURL=colorPercent.js.map