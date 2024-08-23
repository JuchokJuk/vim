import { writable } from 'svelte/store';

export type Parameter = {
	title: string;
	enabled: boolean;
	settings?: Record<string, Parameter>;
};

export const performanceSettings = writable<Record<string, Parameter>>({
	postProcessing: {
		title: 'Постобработка',
		enabled: true,
		settings: {
			ambientOcclusion: { title: 'Глобальное затемнение', enabled: true },
			bloom: { title: 'Свечение', enabled: true },
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
	degradeQualityOnRerender: {
		title: 'Ухудшать качество при частой перерисовке',
		enabled: true,
		settings: {
			postProcessing: { title: 'Выключать постобработку', enabled: true },
			resolution: { title: 'Уменьшать разрешение', enabled: true }
		}
	},
	realisticMirrors: {
		title: 'Реалистичные зеркала',
		enabled: false
	}
});
