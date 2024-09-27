import { get } from 'svelte/store';
import { localItems, type LocalItem } from '../../state/local/project/localItems';
import { history } from '../History';
import { addItem as rawAddItem } from '../raw/addItem';
import { removeItem as rawRemoveItem } from '../raw/removeItem';

export function removeItems(itemsId: string[]) {
	const items: LocalItem[] = [];

	for (const id of itemsId) {
		items.push(structuredClone(get(localItems)[id]));
	}

	history.do({
		do: () => {
			for (const id of itemsId) {
				rawRemoveItem(id);
			}
		},
		undo: () => {
			for (const item of items) {
				rawAddItem(item.id, item);
			}
		}
	});
}
