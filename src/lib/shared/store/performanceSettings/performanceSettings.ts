import { boolean, type BooleanValue } from './values/boolean';
import { selsection, type SelectionValue } from './values/selection';

export type Value<T> = BooleanValue | SelectionValue<T>;

export type Parameter<T> = {
	title: string;
	value: Value<T>;
	settings?: Record<string, Parameter<T>>;
};

export const performanceSettings = {
	resolution: selsection('Разрешение', 0, [0.5, 0.75, 1]),
	postProcessing: {
		...boolean('Постобработка', true),
		settings: {
			ambientOcclusion: boolean('Глобальное затемнение', true),
			bloom: boolean('Свечение', true),
			antiAliasing: boolean('Сглаживание', true),
			noise: boolean('Шум', true)
		}
	},
	shadows: {
		...boolean('Тени', true),
		settings: {
			softShadows: boolean('Мягкие тени', true)
		}
	},
	degradeQualityOnRerender: {
		...boolean('Ухудшать качество при частой перерисовке', true),
		settings: {
			postProcessing: boolean('Выключать постобработку', false),
			resolution: boolean('Уменьшать разрешение', false)
		}
	},
	realisticMirrors: boolean('Реалистичные зеркала', false)
};
