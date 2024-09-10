import { DEG2RAD } from 'three/src/math/MathUtils.js';
import type { Layout } from '../../queries/projects/layouts';
import type { LocalItems } from '$lib/shared/SDK/state/localProject/localItems';
import { models } from '$lib/shared/constants/mocks/models';
import type { FurnitureType } from '../../queries/furniture';

export function serverToLocalLayout(serverLayout: Layout) {
	const layout = structuredClone(serverLayout);

	for (const key in layout.data.vertices) {
		layout.data.vertices[key].x *= 0.01;
		layout.data.vertices[key].y *= 0.01;
	}

	for (const key in layout.data.lines) {
		layout.data.lines[key].properties.height.length *= 0.01;
		layout.data.lines[key].properties.thickness.length *= 0.01;
	}

	for (const key in layout.data.holes) {
		layout.data.holes[key].offset *= 0.01;
		if (layout.data.holes[key].properties.altitude !== undefined) {
			layout.data.holes[key].properties.altitude.length *= 0.01;
		}
		layout.data.holes[key].properties.height.length *= 0.01;
		layout.data.holes[key].properties.width.length *= 0.01;
		layout.data.holes[key].properties.thickness.length *= 0.01;
	}

	const walls = {};

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

	return { walls, items };
}
