import { DEG2RAD } from 'three/src/math/MathUtils.js';
import type { Catalog, FurnitureType } from '../../queries/furniture';
import { models } from '$lib/shared/constants/mocks/models';

/*
LOCAL ITEM:

id: number;
position: [number, number, number];
rotation: number;
dragging: boolean;
name: string;
url: string;

--------------------------------------------------------------------

CATALOG ITEM:

Catalog

--------------------------------------------------------------------

FURNITURE ITEM:

catalog: Catalog;
id: string;
type: string;
prototype: 'items';
name: string;
misc: Record<string, unknown>;
properties: {
	width: {
		length: number;
	};
	height: {
		length: number;
	};
};
visible: boolean;
x: number;
y: number;
rotation: number;

*/

export function catalogItemToLocalItem(catalogItem: Catalog) {
	console.log(catalogItem);

	const item = structuredClone(catalogItem);

	return {
		id: item.id,
		position: [0, 0, 0] as [number, number, number],
		rotation: -90 * DEG2RAD,
		dragging: false,
		name: item.name,
		url: models[item.type_sub.main_type as FurnitureType]
	};
}
