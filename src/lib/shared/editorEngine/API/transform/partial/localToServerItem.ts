import type { LocalItem } from '$lib/shared/editorEngine/state/local/project/localItems';
import { DEG2RAD } from 'three/src/math/MathUtils.js';
import type { Item } from '../../queries/projects/layouts';

export function localToServerItem(localItem: LocalItem): Item {
	console.log({ localItem });
	return {
		catalog: localItem.catalog,
		id: localItem.id,
		type: localItem.catalog.type_sub.name,
		prototype: 'items',
		name: localItem.name,
		misc: {},
		properties: {
			width: {
				length: localItem.catalog.width
			},
			height: {
				length: localItem.catalog.height
			}
		},
		visible: true,
		x: localItem.position[0] * 100,
		y: localItem.position[2] * -100,
		rotation: localItem.rotation / DEG2RAD + 90
	};
}
