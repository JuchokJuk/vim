import { Selection } from 'postprocessing';
import { writable } from 'svelte/store';

export const selectedObjects = writable<Selection>(new Selection());
