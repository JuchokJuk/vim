import type { LayoutData } from '$lib/shared/API/projects/layouts';

export function calculatePolygon(areaId: string, layoutData: LayoutData) {
	const area = layoutData.areas[areaId];

	const polygon: { x: number; y: number }[] = [];

	for (const vertexId of area.vertices) {
		const vertex = layoutData.vertices[vertexId];
		polygon.push({ x: vertex.x, y: vertex.y });
	}

	return polygon;
}
