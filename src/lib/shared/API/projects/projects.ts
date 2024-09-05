import { API, user_id_hardcode } from '../API';

export type Project = {
	name: string;
	id: number;
	author_id: number;
	created_at: string;
};

// PROJECTS

// create
export async function createProject({ project }: { project: unknown }) {
	return await API.post('projects', { searchParams: { user_id_hardcode }, json: project }).json();
}

// read
export async function getProjects(): Promise<Project[]> {
	return await API.get('projects', { searchParams: { user_id_hardcode } }).json();
}
export async function getProject({ projectId }: { projectId: number }): Promise<Project> {
	return await API.get(`projects/${projectId}`, { searchParams: { user_id_hardcode } }).json();
}

// update
export async function updateProject({
	projectId,
	project
}: {
	projectId: number;
	project: unknown;
}) {
	return await API.put(`projects/${projectId}`, {
		searchParams: { user_id_hardcode },
		json: project
	}).json();
}
