import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let query: MediaQueryList | undefined;

function change() {
	touchScreen.set(query!.matches);
}

const touchScreen = writable<boolean>();

if (browser) {
	query = window.matchMedia('(pointer: coarse)');
	query.addEventListener('change', change);

	change();
}

export { touchScreen };
