export default (action: (pct: number) => void, options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void }) => {
	const frameRate = (options && options.duration ? options.duration : 1000) / (options && options.fps ? options.fps : 60);
	const start = Date.now();
	const endTime = start + (options && options.duration ? options.duration : 1000);
	const diff = endTime - start;
	let frameCheck = start;
	function smooth() {
		if (options && options.stop && options.stop()) {
			return;
		}
		const now = Date.now();
		const timePast = now - start;
		const elapsed = now - frameCheck;
		if (elapsed > frameRate) {
			frameCheck = now - (elapsed % frameRate);
			let pct = timePast / diff;
			pct = Math.max(0, Math.min(1, pct));
			action(pct);
		}
		if (now < endTime) {
			window.requestAnimationFrame(smooth);
		} else {
			if(options && options.cb) options.cb();
		}
	};
	window.requestAnimationFrame(smooth);
}
