import { get, writable } from 'svelte/store';
import { updateLayout, type Layout } from '../../API/queries/projects/layouts';
import { userId } from '$lib/shared/store/user';

export const serverLayout = writable<Layout>();

serverLayout.subscribe((layout) => {
	// todo: skip on initialization
	if (layout) {
		updateLayout({ layoutId: layout.id, layout, user_id_hardcode: get(userId) });
	}
});
