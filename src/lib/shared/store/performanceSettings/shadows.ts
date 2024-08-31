import { persisted } from 'svelte-persisted-store';

export const shadows = persisted('shadows', true);
export const softShadows = persisted('softShadows', true);

shadows.subscribe((value: boolean) => {
	if (!value) softShadows.set(false);
});

softShadows.subscribe((value: boolean) => {
	if (value) shadows.set(true);
});
