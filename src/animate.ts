/**
 * 
 * @param action (pct: number) => void
 * @param options { fps?: number, duration?: number, resumePct?: number, stop?: () => boolean, cb?: () => void }
 */
export const Animate = async (
	action: (pct: number) => Promise<void>,
	options?: { fps?: number, duration?: number, resumePct?: number, stop?: () => Promise<boolean>, cb?: () => Promise<void> }) => {
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
	const nextFrame = () => new Promise(res => window.requestAnimationFrame(res));
	let frameCheck = start;

	async function AnimateFrame () {
		const stp = stop ? await stop() : undefined;
		if (stp) {
			return;
		}

		const now = performance.now();
		const timePast = now - start;
		const elapsed = now - frameCheck;
		if (elapsed > frameRate) {
			frameCheck = now - (elapsed % frameRate);
			const pct = Math.max(0, Math.min(1, (resumePct === 1 ? undefined : resumePct) ?? (timePast / diff)));
			if (resumePct) { resumePct = undefined };
			await action(pct);
		}
		if (now < endTime) {
			await AnimateFrame().then(nextFrame);
		} else {
			if(cb) await cb();
		}
	};
	await AnimateFrame().then(nextFrame);
}
