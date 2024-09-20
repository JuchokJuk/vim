import { persisted } from 'svelte-persisted-store';

export const shadows = persisted('shadows', true, { syncTabs: false });
export const softShadows = persisted('softShadows', true, { syncTabs: false });

shadows.subscribe((value: boolean) => {
	if (!value) softShadows.set(false);
});

softShadows.subscribe((value: boolean) => {
	if (value) shadows.set(true);
});
