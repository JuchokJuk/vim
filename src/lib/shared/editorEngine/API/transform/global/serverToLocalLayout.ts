import { DEG2RAD } from 'three/src/math/MathUtils.js';
import type { Layout } from '../../queries/projects/layouts';
import type { LocalItems } from '$lib/shared/editorEngine/state/local/project/localItems';
import { models } from '$lib/shared/constants/mocks/models';
import type { FurnitureType } from '../../queries/furniture';

export function serverToLocalLayout(serverLayout: Layout) {
	if (serverLayout.data.vertices === undefined) serverLayout.data.vertices = {};
	if (serverLayout.data.lines === undefined) serverLayout.data.lines = {};
	if (serverLayout.data.holes === undefined) serverLayout.data.holes = {};
	if (serverLayout.data.areas === undefined) serverLayout.data.areas = {};
	if (serverLayout.data.items === undefined) serverLayout.data.items = {};

	const layout = structuredClone(serverLayout);

	// todo: create real local data structures

	for (const key in layout.data.vertices) {
		layout.data.vertices[key].x *= 0.01;
		layout.data.vertices[key].y *= 0.01;
	}

	for (const key in layout.data.lines) {
		layout.data.lines[key].properties.height.length *= 0.01;
		layout.data.lines[key].properties.thickness.length *= 0.01;
	}

	for (const key in layout.data.holes) {
		if (layout.data.holes[key].properties.altitude !== undefined) {
			layout.data.holes[key].properties.altitude.length *= 0.01;
		}
		layout.data.holes[key].properties.height.length *= 0.01;
		layout.data.holes[key].properties.width.length *= 0.01;
		layout.data.holes[key].properties.thickness.length *= 0.01;
	}

	const rooms = {
		holes: layout.data.holes,
		lines: layout.data.lines,
		vertices: layout.data.vertices,
		areas: layout.data.areas
	};

	const items: LocalItems = {};

	for (const itemId in serverLayout.data.items) {
		const item = serverLayout.data.items[itemId];

		items[itemId] = {
			id: itemId,
			catalog: item.catalog,
			position: [item.x * 0.01, 0, -item.y * 0.01],
			rotation: item.rotation * DEG2RAD - 90 * DEG2RAD,
			dragging: false,
			name: item.name,
			url: models[item.catalog.type_sub.main_type as FurnitureType]
		};
	}

	return { rooms, items };
}
