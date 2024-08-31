import { persisted } from 'svelte-persisted-store';

export const resolution = persisted('resolution', 0.5);
export const options = [0.5, 0.75, 1];
