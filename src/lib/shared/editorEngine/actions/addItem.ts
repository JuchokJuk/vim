import type { Catalog } from '../API/queries/furniture';
import { localItems } from '../state/local/project/localItems';
import { serverLayout } from '../state/server/serverProject';

export function addItem(newItem: Catalog /* server item */) {
	serverLayout.update((layout) => {
		layout.data.items[newItem.id] = newItem;

		return layout;
	});

	localItems.update((items) => {
		items[newItem.id] = newItem;
		return items;
	});
}
