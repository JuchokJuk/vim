import { localToServerItem } from '../API/transform/partial/localToServerItem';
import type { LocalItem } from '../state/local/project/localItems';
import { serverLayout } from '../state/server/serverProject';

// local updates handled by bindings

export function updateItem(newItem: LocalItem) {
	serverLayout.update((layout) => {
		layout.data.items[newItem.id] = localToServerItem(newItem);

		return layout;
	});
}
