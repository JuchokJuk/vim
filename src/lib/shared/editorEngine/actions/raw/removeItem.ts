import { localItems } from '../../state/local/project/localItems';
import { serverLayout } from '../../state/server/serverProject';

export function removeItem(itemId: string) {
	serverLayout.update((layout) => {
		delete layout.data.items[itemId];

		return layout;
	});

	localItems.update((items) => {
		delete items[itemId];

		return items;
	});
}
