import { writable } from 'svelte/store';
import type { Furniture } from '$lib/shared/editorEngine/API/queries/furniture';

export const itemsCatalog = writable<Furniture>();
