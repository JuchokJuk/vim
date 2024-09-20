<script lang="ts">
	import Draggable from './Draggable/Draggable.svelte';
	import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/shared/store/3d/cameraEnabled';
	import ObjectComponent from './Object.svelte';
	import { selectedObjects } from '$lib/shared/store/3d/selectedObjects';
	import { T, useThrelte } from '@threlte/core';
	import { localItems } from '$lib/shared/editorEngine/state/local/project/localItems';
	import { activeFurnitureItem } from '$lib/shared/store/3d/activeFurnitureItem';
	import { onMount } from 'svelte';
	import { addItem } from '$lib/shared/editorEngine/actions/addItem';
	import { catalogItemToLocalItem } from '$lib/shared/editorEngine/API/transform/partial/catalogItemToLocalItem';

	const { renderer } = useThrelte();

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	$: $cameraEnabled = Object.values($localItems).reduce((a, b) => a && !b.dragging, true);

	function unselect() {
		$selectedObjects.clear();
		$selectedObjects = $selectedObjects;
	}

	function addNewItem() {
		if (!$activeFurnitureItem) return;

		console.log('add item', $activeFurnitureItem);
		addItem(catalogItemToLocalItem($activeFurnitureItem));
		$activeFurnitureItem = undefined;
	}

	onMount(() => {
		renderer.domElement.addEventListener('pointerdown', addNewItem);

		return () => {
			renderer.domElement.removeEventListener('pointerdown', addNewItem);
		};
	});
</script>

<T.Group on:pointermissed={unselect}>
	{#each Object.keys($localItems) as itemId (itemId)}
		<Draggable
			{floorPlane}
			item={$localItems[itemId]}
			bind:position={$localItems[itemId].position}
			bind:rotation={$localItems[itemId].rotation}
			bind:dragging={$localItems[itemId].dragging}
		>
			<Info content={$localItems[itemId].name} let:open>
				<ObjectComponent url={$localItems[itemId].url} openInfo={open} />
			</Info>
		</Draggable>
	{/each}
</T.Group>
