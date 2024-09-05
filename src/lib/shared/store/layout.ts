import { writable } from 'svelte/store';
import type { Layout } from '$lib/shared/API/fetch/projects/layouts';

export const layout = writable<Layout>();
