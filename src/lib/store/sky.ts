import { writable } from 'svelte/store';

export const sky = writable({
	azimuth: 45,
	elevation: 45
});
