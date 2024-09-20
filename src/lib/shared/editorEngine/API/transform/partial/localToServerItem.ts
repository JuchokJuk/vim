import { DEG2RAD } from 'three/src/math/MathUtils.js';

export function localToServerItem(localItem: {
	id: number;
	position: [number, number, number];
	rotation: number;
}) {
	return {
		x: localItem.position[0] * 100,
		y: localItem.position[2] * -100,
		rotation: localItem.rotation / DEG2RAD + 90
	};
}

export function localToServerItemPosition(position: [number, number, number]) {
	return {
		x: position[0] * 100,
		y: position[2] * -100
	};
}

export function localToServerItemRotation(rotation: number) {
	return rotation / DEG2RAD + 90;
}
