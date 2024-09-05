import { getProject } from '$lib/shared/API/fetch/projects/projects';
import { getProjectLayouts } from '$lib/shared/API/fetch/projects/layouts';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';

export async function load({ params }) {
	try {
		const [project, layouts] = await Promise.all([
			getProject({ projectId: Number(params.projectId) }),
			getProjectLayouts({ projectId: Number(params.projectId) })
		]);

		const layout = layouts.find((layout) => layout.id === Number(params.layoutId));

		if (!layout) {
			error(404, 'Layout not found');
		}

		return { project, layout };
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
