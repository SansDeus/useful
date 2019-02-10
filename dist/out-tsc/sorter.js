export default (array, prop, reverse = false) => {
    return array.sort((a, b) => ((a[prop] < b[prop]) ? (reverse ? 1 : -1) : (a[prop] > b[prop]) ? (reverse ? -1 : 1) : 0));
};
//# sourceMappingURL=sorter.js.map