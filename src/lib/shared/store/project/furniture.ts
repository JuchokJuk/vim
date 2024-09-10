import { writable } from 'svelte/store';
import type { Furniture } from '$lib/shared/SDK/API/queries/furniture';

export const furniture = writable<Furniture>();
