import { getProject } from '$lib/shared/editorEngine/API/queries/projects/projects';
import { getLayout } from '$lib/shared/editorEngine/API/queries/projects/layouts';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';
// import { getFurniture } from '$lib/shared/editorEngine/API/queries/furniture.js';

export async function load({ params }) {
	try {
		const [project, layout /*furniture*/] = await Promise.all([
			getProject({ projectId: Number(params.projectId) }),
			getLayout({ layoutId: Number(params.layoutId) })
			// getFurniture({ skip: 0, limit: 99999 })
		]);

		return { project, layout /*furniture*/ };
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
