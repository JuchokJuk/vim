import { writable, get } from 'svelte/store';
import { updateProjectLayout, type Layout } from '../API/queries/projects/layouts';
import type { Project } from '../API/queries/projects/projects';

export const serverLayout = writable<Layout>();
export const serverProject = writable<Project>();

serverLayout.subscribe((layout) => {
	// todo: skip on initialization
	if (get(serverProject)) {
		updateProjectLayout({ projectId: get(serverProject).id, layoutId: layout.id, layout });
	}
});
