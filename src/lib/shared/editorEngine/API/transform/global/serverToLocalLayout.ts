import { DEG2RAD } from 'three/src/math/MathUtils.js';
import type { Layout } from '../../queries/projects/layouts';
import type { LocalItems } from '$lib/shared/editorEngine/state/localProject/localItems';
import { models } from '$lib/shared/constants/mocks/models';
import type { FurnitureType } from '../../queries/furniture';

export function serverToLocalLayout(serverLayout: Layout) {
	const layout = structuredClone(serverLayout);

	if (layout.data.vertices === undefined) layout.data.vertices = {};
	if (layout.data.lines === undefined) layout.data.lines = {};
	if (layout.data.holes === undefined) layout.data.holes = {};
	if (layout.data.areas === undefined) layout.data.areas = {};
	if (layout.data.items === undefined) layout.data.items = {};

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
			position: [item.x * 0.01, 0, -item.y * 0.01],
			rotation: item.rotation * DEG2RAD - 90 * DEG2RAD,
			dragging: false,
			name: item.name,
			url: models[item.catalog.type_sub.main_type as FurnitureType]
		};
	}

	return { rooms, items };
}
