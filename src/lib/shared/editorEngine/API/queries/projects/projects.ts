import { API } from '../API';

export type Project = {
	name: string;
	id: number;
	author_id: number;
	created_at: string;
};

// PROJECTS

// create
export async function createProject({
	project,
	user_id_hardcode
}: {
	project: unknown;
	user_id_hardcode: number;
}) {
	return await API.post('projects', { searchParams: { user_id_hardcode }, json: project }).json();
}

// read
export async function getProjects({
	user_id_hardcode
}: {
	user_id_hardcode: number;
}): Promise<Project[]> {
	return await API.get('projects', { searchParams: { user_id_hardcode } }).json();
}
export async function getProject({
	projectId,
	user_id_hardcode
}: {
	projectId: number;
	user_id_hardcode: number;
}): Promise<Project> {
	return await API.get(`projects/${projectId}`, { searchParams: { user_id_hardcode } }).json();
}

// update
export async function updateProject({
	projectId,
	project,
	user_id_hardcode
}: {
	projectId: number;
	project: unknown;
	user_id_hardcode: number;
}) {
	return await API.put(`projects/${projectId}`, {
		searchParams: { user_id_hardcode },
		json: project
	}).json();
}
