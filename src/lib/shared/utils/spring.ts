import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const raf = browser ? window.requestAnimationFrame : () => {};

export function spring(value: number, { stiffness = 0.15, damping = 0.8, precision = 0.001 }) {
	const store = writable(value);

	let springStiffness = stiffness;
	let springDamping = damping;
	let springPrecision = precision;

	let lastTime: number;

	let lastValue = value;
	let currentValue = value;
	let targetValue = value;

	let running = false;

	function updateOptions({ stiffness = 0.15, damping = 0.8, precision = 0.001 }) {
		springStiffness = stiffness;
		springDamping = damping;
		springPrecision = precision;
	}

	function set(newValue: number, hard: boolean = false) {
		targetValue = newValue;
		if (hard) {
			lastValue = newValue;
			currentValue = newValue;
		}
		if (!running) {
			running = true;
			lastTime = performance.now();
			raf(loop);
		}
	}

	function loop() {
		const currentTime = performance.now();
		const deltaTime = Math.min(currentTime - lastTime, 42) * 0.06;

		const targetDeltaValue = targetValue - currentValue;
		const velocity = (currentValue - lastValue) / (deltaTime || Number.EPSILON);
		const spring = springStiffness * targetDeltaValue;
		const damper = springDamping * velocity;
		const acceleration = spring - damper;
		const valueGrowth = (velocity + acceleration) * deltaTime;

		lastValue = currentValue;

		if (Math.abs(valueGrowth) < springPrecision && Math.abs(targetDeltaValue) < springPrecision) {
			store.set((currentValue = targetValue));
			running = false;
		} else {
			store.set((currentValue = currentValue + valueGrowth));
			lastTime = currentTime;
			raf(loop);
		}
	}

	return {
		set,
		updateOptions,
		subscribe: store.subscribe
	};
}
