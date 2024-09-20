import type { Catalog } from '$lib/shared/editorEngine/API/queries/furniture';
import { writable } from 'svelte/store';

export interface LocalItem {
	id: string;
	catalog: Catalog;
	position: [number, number, number];
	rotation: number;
	dragging: boolean;
	name: string;
	url: string;
}

export type LocalItems = Record<string, LocalItem>;

export const localItems = writable<LocalItems>({});
