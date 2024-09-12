import {
	localToServerItem,
	localToServerItemPosition,
	localToServerItemRotation
} from '../API/transform/partial/localToServerItem';
import { serverLayout } from '../state/serverProject';

// local updates handled by bindings

export function updateItem(newItem: {
	id: string;
	position: [number, number, number];
	rotation: number;
}) {
	serverLayout.update((layout) => {
		const serverItem = layout.data.items[newItem.id];
		const newServerItem = localToServerItem(newItem);

		Object.assign(serverItem, newServerItem);

		return layout;
	});
}

export function updateItemPosition(itemId: string, newPosition: [number, number, number]) {
	serverLayout.update((layout) => {
		const serverItem = layout.data.items[itemId];
		const newServerItemPosition = localToServerItemPosition(newPosition);

		Object.assign(serverItem, newServerItemPosition);

		return layout;
	});
}

export function updateItemRotation(itemId: string, newRotation: number) {
	serverLayout.update((layout) => {
		const serverItem = layout.data.items[itemId];
		const newServerItemRotation = localToServerItemRotation(newRotation);

		serverItem.rotation = newServerItemRotation;

		return layout;
	});
}
