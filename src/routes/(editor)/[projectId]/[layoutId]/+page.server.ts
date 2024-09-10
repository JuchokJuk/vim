import { getProject } from '$lib/shared/SDK/API/queries/projects/projects';
import { getProjectLayouts } from '$lib/shared/SDK/API/queries/projects/layouts';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';
import { getFurniture } from '$lib/shared/SDK/API/queries/furniture.js';

export async function load({ params }) {
	try {
		const [project, layouts, furniture] = await Promise.all([
			getProject({ projectId: Number(params.projectId) }),
			getProjectLayouts({ projectId: Number(params.projectId) }),
			getFurniture({ skip: 0, limit: 99999 })
		]);

		const layout = layouts.find((layout) => layout.id === Number(params.layoutId));

		if (!layout) {
			error(404, 'Layout not found');
		}

		return { project, layout, furniture };
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
