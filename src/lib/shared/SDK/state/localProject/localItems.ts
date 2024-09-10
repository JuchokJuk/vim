import { writable } from 'svelte/store';

export interface LocalItem {
	id: string;
	position: [number, number, number];
	rotation: number;
	dragging: boolean;
	name: string;
	url: string;
}

export type LocalItems = Record<string, LocalItem>;

export const localItems = writable<LocalItems>({});
