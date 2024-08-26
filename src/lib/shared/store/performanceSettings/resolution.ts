import { writable } from 'svelte/store';

export const resolution = writable(0.5);
export const options = [0.5, 0.75, 1];
