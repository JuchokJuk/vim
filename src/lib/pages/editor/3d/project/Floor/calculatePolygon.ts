import type { LocalRooms } from '$lib/shared/editorEngine/state/localProject/localRooms';

export function calculatePolygon(areaId: string, localRooms: LocalRooms) {
	const area = localRooms.areas[areaId];

	const polygon: { x: number; y: number }[] = [];

	for (const vertexId of area.vertices) {
		const vertex = localRooms.vertices[vertexId];
		polygon.push({ x: vertex.x, y: vertex.y });
	}

	return polygon;
}
