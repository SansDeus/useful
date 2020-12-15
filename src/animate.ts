export const Animate = (action: (pct: number) => void, options?: { fps?: number, duration?: number, stop?: () => boolean, cb?: () => void }) => {
	let { duration, fps, stop, cb } = options ? options : { duration: undefined, fps: undefined, stop: undefined, cb: undefined };
	duration ||= 1000;
	fps ||= 60;
	const frameRate = duration / fps;
	const start = Date.now();
	const endTime = start + duration;
	const diff = endTime - start;
	let frameCheck = start;
	//Should be able to get pct and duration to calulate when to start again on the other side for pause functionality.
	function AnimateFrame() {
		if (stop && stop()) {
			return;
		}
		const now = Date.now();
		const timePast = now - start;
		const elapsed = now - frameCheck;
		if (elapsed > frameRate) {
			frameCheck = now - (elapsed % frameRate);
			const pct = Math.max(0, Math.min(1, timePast / diff));
			action(pct);
		}
		if (now < endTime) {
			window.requestAnimationFrame(AnimateFrame);
		} else {
			if(cb) cb();
		}
	};
	window.requestAnimationFrame(AnimateFrame);
}
