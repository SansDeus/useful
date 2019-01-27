export default (action: (pct: number, stop?: boolean) => void, fps: number, speed: number, cb?: () => void) => {
	const frameRate = (speed * 1000) / fps;
	const start = Date.now();
	const endTime = start + (speed * 1000);
	const diff = endTime - start;
	let frameCheck = start;
	function smooth() {
		if (stop) {
			if (cb) cb();
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
			if(cb) cb();
		}
	};
	window.requestAnimationFrame(smooth);
}
