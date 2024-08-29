import { API } from './API';

export type Project = {
	name: string;
	id: number;
	author_id: number;
	created_at: string;
};

// todo: разхардкодить дефолтного юзера
const user_id_hardcode = 1;

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
	return await API.get(`projects/${projectId}`, { searchParams: { user_id_hardcode: 1 } }).json();
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

// PROJECT LAYOUTS

// create
export async function addProjectLayout({
	projectId,
	layout
}: {
	projectId: number;
	layout: unknown;
}) {
	return await API.post(`projects/${projectId}/layouts`, {
		searchParams: { user_id_hardcode },
		json: layout
	}).json();
}
// read
export async function getProjectLayouts({ projectId }: { projectId: number }) {
	return await API.get(`projects/${projectId}/layouts`, {
		searchParams: { user_id_hardcode }
	}).json();
}
// update
export async function updateProjectLayout({
	projectId,
	layoutId,
	layout
}: {
	projectId: number;
	layoutId: number;
	layout: unknown;
}) {
	return await API.put(`projects/${projectId}/layouts${layoutId}`, {
		searchParams: { user_id_hardcode },
		json: layout
	}).json();
}
