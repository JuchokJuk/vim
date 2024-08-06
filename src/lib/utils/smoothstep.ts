import { clamp } from "./clamp";

export function smoothstep(min: number, max: number, value: number) {
	const t = clamp((value - min) / (max - min), 0.0, 1.0);
	return t * t * (3.0 - 2.0 * t);
}
