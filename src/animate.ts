export const Animate = (
	action: (pct: number) => void,
	options?: { fps?: number, duration?: number, resumePct?: number, stop?: () => boolean, cb?: () => void }) => {
	const { stop, cb } = options ? options : { stop: undefined, cb: undefined };
	let { duration, fps, resumePct } = options ? options : { duration: undefined, fps: undefined, resumePct: undefined };
	duration ??= 1000; fps ??= 60;
	if (resumePct) {
		duration *= resumePct;
	}
	const frameRate = duration / fps;
	const start = performance.now();
	const endTime = start + duration;
	const diff = endTime - start;
	let frameCheck = start;

	function AnimateFrame() {
		if (stop && stop()) {
			return;
		}
		const now = performance.now();
		const timePast = now - start;
		const elapsed = now - frameCheck;
		if (elapsed > frameRate) {
			frameCheck = now - (elapsed % frameRate);
			const pct = Math.max(0, Math.min(1, resumePct ?? (timePast / diff)));
			if (resumePct) { resumePct = undefined };
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
