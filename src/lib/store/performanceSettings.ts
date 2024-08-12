import { writable } from 'svelte/store';

export const performanceSettings = writable({
	postProcessing: {
		enabled: false,
		settings: {
			ambientOcclusion: { enabled: false },
			godRays: { enabled: false },
			bloom: { enabled: false },
			antiAliasing: { enabled: false }
		}
	},
	shadows: {
		enabled: true,
		settings: {
			softShadows: { enabled: true }
		}
	}
});
