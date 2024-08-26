import { writable, type Writable } from 'svelte/store';
import type { Parameter } from '../performanceSettings';

export type BooleanValue = {
	type: 'boolean';
	value: Writable<boolean>;
};

export function boolean(title: string, value: boolean): Parameter<boolean> {
	return { title, value: { type: 'boolean', value: writable(value) } };
}
