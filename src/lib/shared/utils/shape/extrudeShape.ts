import { ExtrudeGeometry, Shape } from 'three';

// Функция, создающая 2D-контур для стены
export function extrudeShape(shape: Shape, height: number) {
	const extrudeSettings = {
		depth: height,
		bevelEnabled: false
	};
	return new ExtrudeGeometry(shape, extrudeSettings);
}
