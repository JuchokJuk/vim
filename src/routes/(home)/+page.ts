import { getProjects } from '$lib/shared/API/projects';
import { error } from '@sveltejs/kit';
import type { HTTPError } from 'ky';

export async function load() {
	try {
		const projects = await getProjects();
		return { projects };
	} catch (e) {
		error(500, (e as HTTPError).message);
	}
}
