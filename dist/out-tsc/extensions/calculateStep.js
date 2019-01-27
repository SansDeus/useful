if (!Array.prototype.calculateStep) {
    Array.prototype.calculateStep =
        function (percent) {
            percent = Math.max(Math.min(1, percent), 0);
            const modifier = ((this.length - 1) * percent);
            const step = Math.floor(modifier);
            return {
                highpct: (modifier - step),
                lowpct: (1 - (modifier - step)),
                startIndex: this[step],
                endIndex: percent === 1 ? this[step] : this[step + 1]
            };
        };
}
//# sourceMappingURL=calculateStep.js.map