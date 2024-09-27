import { type LocalItem } from '../../state/local/project/localItems';
import { history } from '../History';
import { addItem as rawAddItem } from '../raw/addItem';
import { removeItem as rawRemoveItem } from '../raw/removeItem';

export function addItem(newItem: LocalItem) {
	history.do({
		do: () => {
			rawAddItem(newItem.id, newItem);
		},
		undo: () => {
			rawRemoveItem(newItem.id);
		}
	});
}
