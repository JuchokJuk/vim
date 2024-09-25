import { writable, get } from 'svelte/store';
import { updateLayout, type Layout } from '../../API/queries/projects/layouts';
import { user } from './user';

export const serverLayout = writable<Layout>();

serverLayout.subscribe((layout) => {
	// todo: skip on initialization
	const id = get(user).id;
	if (layout && id !== undefined) {
		updateLayout({ layoutId: layout.id, layout, user_id_hardcode: id });
	}
});
