import { writable } from 'svelte/store';

export const shadows = writable(true);
export const softShadows = writable(true);

shadows.subscribe((value: boolean) => {
	if (!value) softShadows.set(false);
});

softShadows.subscribe((value: boolean) => {
	if (value) shadows.set(true);
})