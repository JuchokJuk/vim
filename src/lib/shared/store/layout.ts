import { writable } from 'svelte/store';
import type { Layout } from '$lib/shared/API/projects/layouts';

export const layout = writable<Layout>();
