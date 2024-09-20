import type { Catalog } from '$lib/shared/editorEngine/API/queries/furniture';
import { writable } from 'svelte/store';

export const activeFurnitureItem = writable<Catalog | undefined>(undefined);
