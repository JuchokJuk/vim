import { API, user_id_hardcode } from '../API';

export type Texture = 'bricks' | 'none';

export type Layout = {
	id: number;
	project_id: number;
	created_at: string;
	updated_at: string;
	data: LayoutData;
};

export type LayoutData = {
	id: string;
	altitude: number;
	order: number;
	opacity: number;
	name: string;
	visible: boolean;
	vertices: Record<string, Vertex>;
	lines: Record<string, Line>;
	holes: Record<string, Hole>;
	areas: Record<string, Area>;
	items: Record<string, Item>;
	layout_area_temp: string;
};

export type Vertex = {
	id: string;
	type: '';
	prototype: 'vertices';
	name: 'Vertex';
	misc: Record<string, unknown>;
	properties: Record<string, unknown>;
	visible: boolean;
	x: number;
	y: number;
	lines: string[];
	areas: string[];
};

export type Line = {
	id: string;
	type: 'wall';
	prototype: 'lines';
	name: 'Wall';
	misc: Record<string, unknown>;
	properties: {
		height: {
			length: number;
		};
		thickness: {
			length: number;
		};
		textureA: Texture;
		textureB: Texture;
	};
	visible: true;
	vertices: string[];
	holes: string[];
};

export type Hole = unknown;

export type Area = {
	id: string;
	type: 'area';
	prototype: 'areas';
	name: 'Area';
	misc: Record<string, unknown>;
	properties: Record<string, unknown>;
	visible: boolean;
	vertices: ['WH6EbvseGPN', 'lPIW0ix0zIv', 'ol2RcCEACnq', 'TOf5vpwi9Qv'];
	holes: [];
};

export type Item = {
	id: string;
	type: string;
	prototype: 'items';
	name: string;
	misc: Record<string, unknown>;
	properties: {
		width: {
			length: number;
		};
		height: {
			length: number;
		};
	};
	visible: boolean;
	x: number;
	y: number;
	rotation: number;
};

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
export async function getProjectLayouts({ projectId }: { projectId: number }): Promise<Layout[]> {
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
