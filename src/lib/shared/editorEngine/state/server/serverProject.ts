import { writable } from 'svelte/store';
import { updateLayout, type Layout } from '../../API/queries/projects/layouts';

export const serverLayout = writable<Layout>();

serverLayout.subscribe((layout) => {
	// todo: skip on initialization
	if (layout) {
		updateLayout({ layoutId: layout.id, layout });
	}
});
