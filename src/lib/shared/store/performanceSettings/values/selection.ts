import { writable, type Writable } from 'svelte/store';
import type { Parameter } from '../performanceSettings';

export type SelectionValue<T> = {
	type: 'selection';
	activeOption: Writable<number>;
	options: T[];
};

export function selsection<T>(title: string, activeOption: number, options: T[]): Parameter<T> {
	return { title, value: { type: 'selection', activeOption: writable(activeOption), options } };
}
