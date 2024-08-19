import { writable } from 'svelte/store';

export const performanceSettings = writable({
	postProcessing: {
		enabled: false,
		settings: {
			ambientOcclusion: { enabled: true },
			bloom: { enabled: false },
			antiAliasing: { enabled: true }
		}
	},
	shadows: {
		enabled: true,
		settings: {
			softShadows: { enabled: true }
		}
	},
	lowResolutionOnCameraMove: { enabled: false }
});
