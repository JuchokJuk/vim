import { Shape } from 'three';

export function createShape(vertices: { x: number; y: number }[]): Shape {
	const shape = new Shape();
	shape.moveTo(vertices[0].x, vertices[0].y);
	for (let i = 1; i < vertices.length; i++) {
		shape.lineTo(vertices[i].x, vertices[i].y);
	}
	shape.lineTo(vertices[0].x, vertices[0].y); // замыкаем контур
	return shape;
}
