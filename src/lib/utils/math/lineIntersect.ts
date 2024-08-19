export function lineIntersect(
	lineA: { start: { x: number; y: number }; end: { x: number; y: number } },
	lineB: { start: { x: number; y: number }; end: { x: number; y: number } }
): { x: number; y: number } | undefined {
	const denominator =
		(lineB.end.y - lineB.start.y) * (lineA.end.x - lineA.start.x) -
		(lineB.end.x - lineB.start.x) * (lineA.end.y - lineA.start.y);

	if (denominator == 0) return undefined;

	const ua =
		((lineB.end.x - lineB.start.x) * (lineA.start.y - lineB.start.y) -
			(lineB.end.y - lineB.start.y) * (lineA.start.x - lineB.start.x)) /
		denominator;

	return {
		x: lineA.start.x + ua * (lineA.end.x - lineA.start.x),
		y: lineA.start.y + ua * (lineA.end.y - lineA.start.y)
	};
}
