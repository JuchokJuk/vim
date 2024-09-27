import { localToServerItem } from '../../API/transform/partial/localToServerItem';
import { localItems, type LocalItem } from '../../state/local/project/localItems';
import { serverLayout } from '../../state/server/serverProject';

export function addItem(newItemId: string, newItem: LocalItem) {
	serverLayout.update((layout) => {
		layout.data.items[newItemId] = localToServerItem(newItem);

		return layout;
	});

	localItems.update((items) => {
		items[newItemId] = newItem;
		return items;
	});
}
