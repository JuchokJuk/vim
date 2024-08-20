import { writable } from 'svelte/store';
import type { Group } from 'three';

export const walls = writable<Group>();
