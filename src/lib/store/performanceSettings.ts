import { writable } from 'svelte/store';

export const performanceSettings = writable({
	postProcessing: {
		title: 'Постобработка',
		enabled: false,
		settings: {
			ambientOcclusion: { title: 'Глобальное затемнение', enabled: true },
			bloom: { title: 'Свечение', enabled: false },
			antiAliasing: { title: 'Сглаживание', enabled: true }
		}
	},
	shadows: {
		title: 'Тени',
		enabled: true,
		settings: {
			softShadows: { title: 'Мягкие тени', enabled: true }
		}
	},
	lowResolutionOnCameraMove: {
		title: 'Уменьшать разрешение при перемещении камеры',
		enabled: true
	},
	realisticMirrors: {
		title: 'Реалистичные зеркала',
		enabled: false
	}
});
