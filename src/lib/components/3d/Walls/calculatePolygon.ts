import { getNormalVector } from '$lib/utils/math/getNormalVector';
import { lineIntersect } from '$lib/utils/math/lineIntersect';
import type { Wall } from './walls';

type Ending = 'start' | 'end';
const endings: Ending[] = ['start', 'end'];

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
	wallA: Wall,
	wallANormalVector: { x: number; y: number },
	wallB: Wall,
	wallBNormalVector: { x: number; y: number }
) {
	return lineIntersect(
		{
			start: {
				x: wallA.start.x + (wallANormalVector.x * wallA.thickness) / 2,
				y: wallA.start.y + (wallANormalVector.y * wallA.thickness) / 2
			},
			end: {
				x: wallA.end.x + (wallANormalVector.x * wallA.thickness) / 2,
				y: wallA.end.y + (wallANormalVector.y * wallA.thickness) / 2
			}
		},
		{
			start: {
				x: wallB.start.x + (wallBNormalVector.x * wallB.thickness) / 2,
				y: wallB.start.y + (wallBNormalVector.y * wallB.thickness) / 2
			},
			end: {
				x: wallB.end.x + (wallBNormalVector.x * wallB.thickness) / 2,
				y: wallB.end.y + (wallBNormalVector.y * wallB.thickness) / 2
			}
		}
	);
}

function addRectangularWallEnding(
	polygon: { x: number; y: number }[],
	wall: Wall,
	ending: Ending,
	direction: Direction
) {
	const baseWallNormalVector = getNormalVector(wall);
	const wallTopPoint = {
		x: wall[ending].x + (baseWallNormalVector.x * wall.thickness) / 2,
		y: wall[ending].y + (baseWallNormalVector.y * wall.thickness) / 2
	};
	const wallBottomPoint = {
		x: wall[ending].x - (baseWallNormalVector.x * wall.thickness) / 2,
		y: wall[ending].y - (baseWallNormalVector.y * wall.thickness) / 2
	};

	if (ending == 'start') {
		if (direction === 'CW') polygon.push(wallBottomPoint);
		if (direction === 'CCW') polygon.push(wallTopPoint);
	}

	if (ending == 'end') {
		if (direction === 'CW') polygon.push(wallTopPoint);
		if (direction === 'CCW') polygon.push(wallBottomPoint);
	}
}

export function calculatePolygon(wallId: string, walls: Record<string, Wall>) {
	const wall = walls[wallId];

	// find all connections with start and end point and move them to 0, 0

	const wallConnectionsScheme: Record<
		Ending,
		{ all: Connection[]; CCW?: Connection; CW?: Connection }
	> = {
		start: { all: [], CCW: undefined, CW: undefined },
		end: { all: [], CCW: undefined, CW: undefined }
	};

	Object.keys(wallConnectionsScheme).forEach((ending) => {
		Object.keys(wall[ending as Ending].connections).forEach((connectionId) => {
			const endings: Ending[] = ['start', 'end'];

			if (wall[ending as Ending].connections[connectionId] === 'end') {
				[endings[0], endings[1]] = [endings[1], endings[0]];
			}

			wallConnectionsScheme[ending as Ending].all.push({
				id: connectionId,
				start: {
					x: walls[connectionId][endings[0]].x - wall[ending as Ending].x,
					y: walls[connectionId][endings[0]].y - wall[ending as Ending].y
				},
				end: {
					x: walls[connectionId][endings[1]].x - wall[ending as Ending].x,
					y: walls[connectionId][endings[1]].y - wall[ending as Ending].y
				}
			});
		});
	});

	// find neugbor connections (nearest in CW and CCW directions)

	const startConnections = fingNeighborsConnections(wallConnectionsScheme.start.all, {
		x: wall.end.x - wall.start.x,
		y: wall.end.y - wall.start.y
	});
	wallConnectionsScheme.start.CCW = startConnections.CCW as Connection;
	wallConnectionsScheme.start.CW = startConnections.CW as Connection;

	const endConnections = fingNeighborsConnections(wallConnectionsScheme.end.all, {
		x: wall.start.x - wall.end.x,
		y: wall.start.y - wall.end.y
	});
	wallConnectionsScheme.end.CCW = endConnections.CCW as Connection;
	wallConnectionsScheme.end.CW = endConnections.CW as Connection;

	// create polygon of intersections

	const polygon: { x: number; y: number }[] = [];

	for (const ending of endings) {
		const currentConnections = wallConnectionsScheme[ending];

		for (const direction of directions) {
			// if there are no connections, add rectangular wall ending
			if (!currentConnections[direction]) {
				addRectangularWallEnding(polygon, wall, ending, direction);
				continue;
			}

			// if there are connections, create nice joint
			const baseWallNormalVector = getNormalVector(wall);
			const connectedWallNormalVector = getNormalVector(walls[currentConnections[direction]!.id]);

			const connectedWallEnding = wall[ending].connections[currentConnections[direction]!.id];
			const invertNormals = direction === (ending === 'start' ? 'CCW' : 'CW');

			// todo: можно скипнуть расчёт пересечения, если стены паралельны
			const intersection = intersectWalls(
				wall,
				transformNormalVector(baseWallNormalVector, !invertNormals),
				walls[currentConnections[direction]!.id],
				transformNormalVector(
					connectedWallNormalVector,
					ending !== connectedWallEnding ? !invertNormals : invertNormals
				)
			);

			if (intersection !== undefined) {
				polygon.push(intersection);
			} else {
				addRectangularWallEnding(polygon, wall, ending, direction);
			}

			// push additional points
			if (ending === 'start' && direction === 'CW') {
				polygon.push({ x: wall.start.x, y: wall.start.y });
			}
			if (ending === 'end' && direction === 'CW') {
				polygon.push({ x: wall.end.x, y: wall.end.y });
			}
		}
	}

	return polygon.length ? polygon : [{ x: 0, y: 0 }];
}
