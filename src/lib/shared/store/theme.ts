import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

let query: MediaQueryList | undefined;

function change() {
	theme.set(query!.matches ? 'dark' : 'light');
}

const theme = writable<Theme>();

if (browser) {
	query = window.matchMedia('(prefers-color-scheme: dark)');

	query.addEventListener('change', change);

	change();
}

export { theme };
