import { writable } from 'svelte/store';
import type { Furniture } from '../API/furniture';

export const furniture = writable<Furniture>();
