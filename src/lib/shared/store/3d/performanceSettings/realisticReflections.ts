import { persisted } from 'svelte-persisted-store';

export const realisticReflections = persisted('realisticReflections', false, { syncTabs: false });
