import { API } from '../API';
import type { Catalog } from '../furniture';

export type Texture = 'bricks' | 'none';

export type Layout = {
	id: number;
	project_id: number;
	created_at: string;
	updated_at: string;
	data: LayoutData;
	name: string;
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

export type Hole = {
	id: string;
	type: string;
	prototype: string;
	name: string;
	misc: Record<string, unknown>;
	properties: {
		altitude?: {
			length: number;
		};
		width: {
			length: number;
		};
		height: {
			length: number;
		};
		thickness: {
			length: number;
		};
		flip_orizzontal?: boolean;
	};
	visible: boolean;
	offset: number;
	line: string;
};

export type Area = {
	id: string;
	type: 'area';
	prototype: 'areas';
	name: 'Area';
	misc: Record<string, unknown>;
	properties: Record<string, unknown>;
	visible: boolean;
	vertices: string[];
	holes: [];
};

export type Item = {
	catalog: Catalog;
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
export async function addLayout({
	projectId,
	layout,
	user_id_hardcode
}: {
	projectId: number;
	layout: unknown;
	user_id_hardcode: number;
}) {
	return await API.post('layouts', {
		searchParams: { user_id_hardcode, project_id: projectId },
		json: layout
	}).json();
}
// read
export async function getLayouts({
	projectId,
	user_id_hardcode
}: {
	projectId: number;
	user_id_hardcode: number;
}): Promise<Layout[]> {
	return await API.get('layouts', {
		searchParams: { user_id_hardcode, project_id: projectId }
	}).json();
}
export async function getLayout({
	layoutId,
	user_id_hardcode
}: {
	layoutId: number;
	user_id_hardcode: number;
}): Promise<Layout> {
	return await API.get(`layouts/${layoutId}`, {
		searchParams: { user_id_hardcode }
	}).json();
}
// update
export async function updateLayout({
	layoutId,
	layout,
	user_id_hardcode
}: {
	layoutId: number;
	layout: unknown;
	user_id_hardcode: number;
}) {
	return await API.patch(`layouts/${layoutId}`, {
		searchParams: { user_id_hardcode },
		json: layout
	}).json();
}
