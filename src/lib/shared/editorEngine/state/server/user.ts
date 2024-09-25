import { writable } from 'svelte/store';

export const user = writable<{ id?: number }>({ id: undefined });
