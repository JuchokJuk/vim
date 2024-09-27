import type { LocalItem } from '$lib/shared/editorEngine/state/local/project/localItems';
import { Selection as PostProcessingSelection } from 'postprocessing';
import { writable } from 'svelte/store';
import type { Object3D } from 'three';

type Selection = {
	items: Record<
		string,
		{
			object3d: Object3D;
			item: LocalItem;
		}
	>;
};

export const selection = writable<Selection>({
	items: {}
});

export const highlightedObjects = writable<PostProcessingSelection>(new PostProcessingSelection());

selection.subscribe((selection) => {
	highlightedObjects.update((highlightedObjects) => {
		highlightedObjects.clear();

		for (const key in selection.items) {
			const selectionItem = selection.items[key];

			selectionItem.object3d.traverse((node) => {
				// @ts-expect-error poor typings
				if (node.isMesh) {
					highlightedObjects.add(node);
				}
			});
		}

		return highlightedObjects;
	});
});
