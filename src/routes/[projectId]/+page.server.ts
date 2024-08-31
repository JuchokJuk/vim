import { getProject } from '$lib/shared/API/projects/projects';
import { getProjectLayouts } from '$lib/shared/API/projects/layouts';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';

export async function load({ params }) {
	try {
		const [project, layouts] = await Promise.all([
			getProject({ projectId: Number(params.projectId) }),
			getProjectLayouts({ projectId: Number(params.projectId) })
		]);

		if (layouts.length) {
			const layout = layouts.reduce((prev, current) =>
				prev && new Date(prev.created_at) > new Date(current.created_at) ? prev : current
			);

			// todo: придумать что-то получше
			if (!layout.data.lines) layout.data.lines = {};
			if (!layout.data.vertices) layout.data.vertices = {};

			return { project, layout };
		} else {
			// тут стоит создать новый layout
			// todo: видимо ошибка  ловится catch'ем и на фронт приходит другой код
			error(404, 'Layout not found');
		}
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
