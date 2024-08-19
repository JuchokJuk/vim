export function getNormalVector(line: {
	start: { x: number; y: number };
	end: { x: number; y: number };
}) {
	const dx = line.start.x - line.end.x;
	const dy = line.start.y - line.end.y;

	const length = Math.sqrt(dx * dx + dy * dy);

	// Нормальный (перпендикулярный) вектор
	return { x: -dy / length, y: dx / length };
}
