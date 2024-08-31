export function shiftPoint(
	point: { x: number; y: number },
	vector: { x: number; y: number },
	distance: number
): { x: number; y: number } {
	// Находим длину вектора направления
	const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

	// Нормализуем вектор направления
	const unit = { x: vector.x / length, y: vector.y / length };

	const shift = { x: unit.x * distance, y: unit.y * distance };

	return { x: point.x + shift.x, y: point.y + shift.y };
}
