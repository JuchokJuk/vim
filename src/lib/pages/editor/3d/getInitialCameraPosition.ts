import type { Vertex } from '$lib/shared/editorEngine/API/queries/projects/layouts';

export function getInitialCameraPosition(roomVertices: Record<string, Vertex>) {
	const position = { x: 0, y: 0, z: 0 };

	for (const vertexId in roomVertices) {
		const vertex = roomVertices[vertexId];
		position.x += vertex.x;
		position.z += vertex.y;
	}

	const verticesCount = Object.keys(roomVertices).length || 1;

	position.x /= verticesCount;
	position.z /= verticesCount;

	return position;
}
