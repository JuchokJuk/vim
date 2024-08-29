import { getProject, getProjectLayouts } from '$lib/shared/API/projects';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';

export async function load({ params }) {
	try {
		const [project, layouts] = await Promise.all([
			getProject({ projectId: Number(params.projectId) }),
			getProjectLayouts({ projectId: Number(params.projectId) })
		]);

		const layout = layouts.reduce((prev, current) =>
			prev && new Date(prev.created_at) > new Date(current.created_at) ? prev : current
		);

		return { project, layout };
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
