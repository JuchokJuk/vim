import type { LayoutData, Line } from '$lib/shared/API/projects/layouts';
import { getNormalVector } from '$lib/shared/utils/math/getNormalVector';
import { lineIntersect } from '$lib/shared/utils/math/lineIntersect';

type Ending = 0 | 1;
const endings: Ending[] = [0, 1];

type Direction = 'CCW' | 'CW';
const directions: Direction[] = ['CW', 'CCW'];

type Connection = {
	id: string;
	start: {
		x: number;
		y: number;
	};
	end: {
		x: number;
		y: number;
	};
};

function transformNormalVector(vector: { x: number; y: number }, invertNormals: boolean) {
	if (invertNormals) {
		return { x: -vector.x, y: -vector.y };
	} else {
		return vector;
	}
}

function toTwoPI(angle: number) {
	return (angle < 0 ? 2 * Math.PI + angle : angle) % (2 * Math.PI);
}

function fingNeighborsConnections(
	connections: Connection[],
	target: { x: number; y: number }
): { CCW: Connection | undefined; CW: Connection | undefined } {
	const targetAngle = toTwoPI(Math.atan2(target.y, target.x));

	const connectiosnAngles = connections.map((connection) => ({
		connection,
		angle: toTwoPI(toTwoPI(Math.atan2(connection.end.y, connection.end.x)) - targetAngle)
	}));

	connectiosnAngles.sort((a, b) => a.angle - b.angle);

	return {
		CW: connectiosnAngles.length ? connectiosnAngles[0].connection : undefined,
		CCW: connectiosnAngles.length
			? connectiosnAngles[connectiosnAngles.length - 1].connection
			: undefined
	};
}

function intersectWalls(
	wallA: Line,
	wallANormalVector: { x: number; y: number },
	wallB: Line,
	wallBNormalVector: { x: number; y: number },
	layoutData: LayoutData
) {
	return lineIntersect(
		{
			start: {
				x:
					getLineEnding(wallA.id, 0, layoutData).x +
					(wallANormalVector.x * wallA.properties.thickness.length) / 2,
				y:
					getLineEnding(wallA.id, 0, layoutData).y +
					(wallANormalVector.y * wallA.properties.thickness.length) / 2
			},
			end: {
				x:
					getLineEnding(wallA.id, 1, layoutData).x +
					(wallANormalVector.x * wallA.properties.thickness.length) / 2,
				y:
					getLineEnding(wallA.id, 1, layoutData).y +
					(wallANormalVector.y * wallA.properties.thickness.length) / 2
			}
		},
		{
			start: {
				x:
					getLineEnding(wallB.id, 0, layoutData).x +
					(wallBNormalVector.x * wallB.properties.thickness.length) / 2,
				y:
					getLineEnding(wallB.id, 0, layoutData).y +
					(wallBNormalVector.y * wallB.properties.thickness.length) / 2
			},
			end: {
				x:
					getLineEnding(wallB.id, 1, layoutData).x +
					(wallBNormalVector.x * wallB.properties.thickness.length) / 2,
				y:
					getLineEnding(wallB.id, 1, layoutData).y +
					(wallBNormalVector.y * wallB.properties.thickness.length) / 2
			}
		}
	);
}

export function getLineEnding(lineId: string, ending: Ending, layoutData: LayoutData) {
	return layoutData.vertices[layoutData.lines[lineId].vertices[ending]];
}

function addRectangularWallEnding(
	polygon: { x: number; y: number }[],
	line: Line,
	ending: Ending,
	direction: Direction,
	layoutData: LayoutData
) {
	const baseWallNormalVector = getNormalVector({
		start: getLineEnding(line.id, 0, layoutData),
		end: getLineEnding(line.id, 1, layoutData)
	});
	const wallTopPoint = {
		x:
			getLineEnding(line.id, ending, layoutData).x +
			(baseWallNormalVector.x * line.properties.thickness.length) / 2,
		y:
			getLineEnding(line.id, ending, layoutData).y +
			(baseWallNormalVector.y * line.properties.thickness.length) / 2
	};
	const wallBottomPoint = {
		x:
			getLineEnding(line.id, ending, layoutData).x -
			(baseWallNormalVector.x * line.properties.thickness.length) / 2,
		y:
			getLineEnding(line.id, ending, layoutData).y -
			(baseWallNormalVector.y * line.properties.thickness.length) / 2
	};

	if (ending == 0) {
		if (direction === 'CW') polygon.push(wallBottomPoint);
		if (direction === 'CCW') polygon.push(wallTopPoint);
	}

	if (ending == 1) {
		if (direction === 'CW') polygon.push(wallTopPoint);
		if (direction === 'CCW') polygon.push(wallBottomPoint);
	}
}

// todo: починить конекшены, попробовать свапнуть концы, провалидировать данные с бекенда

export function calculatePolygon(lineId: string, layoutData: LayoutData) {
	const line = layoutData.lines[lineId];

	// find all connections with start and end point and move them to 0, 0

	const wallConnectionsScheme: Record<
		Ending,
		{ all: Connection[]; CCW?: Connection; CW?: Connection }
	> = {
		0: { all: [], CCW: undefined, CW: undefined },
		1: { all: [], CCW: undefined, CW: undefined }
	};

	for (const ending of endings) {
		for (const connectedLineId of layoutData.vertices[line.vertices[ending]].lines) {
			if (connectedLineId === lineId) continue; // пропускаем связь с самой линией

			const endings: Ending[] = [0, 1];

			// если присоединенная линия подсоединена своим концом - переворачиваем её для правильного расчёта улга между стенами

			if (layoutData.lines[connectedLineId].vertices[1] === line.vertices[ending]) {
				[endings[0], endings[1]] = [endings[1], endings[0]];
			}

			wallConnectionsScheme[ending].all.push({
				id: connectedLineId,
				start: {
					x:
						getLineEnding(connectedLineId, endings[0], layoutData).x -
						getLineEnding(lineId, ending, layoutData).x,
					y:
						getLineEnding(connectedLineId, endings[0], layoutData).y -
						getLineEnding(lineId, ending, layoutData).y
				},
				end: {
					x:
						getLineEnding(connectedLineId, endings[1], layoutData).x -
						getLineEnding(lineId, ending, layoutData).x,
					y:
						getLineEnding(connectedLineId, endings[1], layoutData).y -
						getLineEnding(lineId, ending, layoutData).y
				}
			});
		}
	}

	// find neugbor connections (nearest in CW and CCW directions)

	const startConnections = fingNeighborsConnections(wallConnectionsScheme[0].all, {
		x: getLineEnding(lineId, 1, layoutData).x - getLineEnding(lineId, 0, layoutData).x,
		y: getLineEnding(lineId, 1, layoutData).y - getLineEnding(lineId, 0, layoutData).y
	});
	wallConnectionsScheme[0].CCW = startConnections.CCW as Connection;
	wallConnectionsScheme[0].CW = startConnections.CW as Connection;

	const endConnections = fingNeighborsConnections(wallConnectionsScheme[1].all, {
		x: getLineEnding(lineId, 0, layoutData).x - getLineEnding(lineId, 1, layoutData).x,
		y: getLineEnding(lineId, 0, layoutData).y - getLineEnding(lineId, 1, layoutData).y
	});
	wallConnectionsScheme[1].CCW = endConnections.CCW as Connection;
	wallConnectionsScheme[1].CW = endConnections.CW as Connection;

	// create polygon of intersections

	const polygon: { x: number; y: number }[] = [];

	for (const ending of endings) {
		const currentConnections = wallConnectionsScheme[ending];

		for (const direction of directions) {
			// if there are no connections, add rectangular wall ending
			if (!currentConnections[direction]) {
				addRectangularWallEnding(polygon, line, ending, direction, layoutData);
				continue;
			}

			// if lines are parallel, add rectangular wall ending
			const connectedLineSlope =
				currentConnections[direction].end.y / currentConnections[direction].end.x;
			const lineSlope =
				(getLineEnding(lineId, 0, layoutData).y - getLineEnding(lineId, 1, layoutData).y) /
				(getLineEnding(lineId, 0, layoutData).x - getLineEnding(lineId, 1, layoutData).x);

			if (Math.abs(connectedLineSlope / lineSlope - 1) < 0.001) {
				addRectangularWallEnding(polygon, line, ending, direction, layoutData);
				continue;
			}

			// if there are connections, create nice joint
			const baseWallNormalVector = getNormalVector({
				start: getLineEnding(lineId, 0, layoutData),
				end: getLineEnding(lineId, 1, layoutData)
			});
			const connectedWallNormalVector = getNormalVector({
				start: getLineEnding(currentConnections[direction]!.id, 0, layoutData),
				end: getLineEnding(currentConnections[direction]!.id, 1, layoutData)
			});

			// с каким концом стены соеденина рассчитываемая стена (0 или 1 - start или end)

			let connectedWallEnding;
			const lineEndingVertex = line.vertices[ending];
			const connectedLineVertices = layoutData.lines[currentConnections[direction].id].vertices;

			if (connectedLineVertices[0] === lineEndingVertex) {
				connectedWallEnding = 0;
			}
			if (connectedLineVertices[1] === lineEndingVertex) {
				connectedWallEnding = 1;
			}

			const invertNormals = direction === (ending === 0 ? 'CCW' : 'CW');

			// todo: можно скипнуть расчёт пересечения, если стены паралельны
			const intersection = intersectWalls(
				line,
				transformNormalVector(baseWallNormalVector, !invertNormals),
				layoutData.lines[currentConnections[direction]!.id],
				transformNormalVector(
					connectedWallNormalVector,
					ending !== connectedWallEnding ? !invertNormals : invertNormals
				),
				layoutData
			);

			if (intersection !== undefined) {
				polygon.push(intersection);
			} else {
				addRectangularWallEnding(polygon, line, ending, direction, layoutData);
			}

			// push additional points
			if (ending === 0 && direction === 'CW') {
				polygon.push({
					x: getLineEnding(lineId, 0, layoutData).x,
					y: getLineEnding(lineId, 0, layoutData).y
				});
			}
			if (ending === 1 && direction === 'CW') {
				polygon.push({
					x: getLineEnding(lineId, 1, layoutData).x,
					y: getLineEnding(lineId, 1, layoutData).y
				});
			}
		}
	}

	return polygon;
}
