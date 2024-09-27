<script lang="ts">
	import Draggable from './Draggable/Draggable.svelte';
	import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/shared/store/3d/cameraEnabled';
	import ObjectComponent from './Object.svelte';
	import { selection } from '$lib/shared/store/3d/selectedObjects';
	import { T, useThrelte } from '@threlte/core';
	import { localItems } from '$lib/shared/editorEngine/state/local/project/localItems';
	import { activeFurnitureItem } from '$lib/shared/store/3d/activeFurnitureItem';
	import { onMount } from 'svelte';
	import { addItem } from '$lib/shared/editorEngine/actions/historical/addItem';
	import { catalogItemToLocalItem } from '$lib/shared/editorEngine/API/transform/partial/catalogItemToLocalItem';
	import { Raycaster } from 'three/src/core/Raycaster.js';
	import { Vector2 } from 'three/src/math/Vector2.js';
	import { useCursor } from '@threlte/extras';
	import { removeItems } from '$lib/shared/editorEngine/actions/historical/removeItems';
	import { shortcut } from '$lib/shared/utils/shortcut';

	const { renderer, camera } = useThrelte();

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	$: $cameraEnabled = Object.values($localItems).reduce((a, b) => a && !b.dragging, true);

	function unselect() {
		$selection = { items: {} };
	}

	const pointer = new Vector2();
	const raycaster = new Raycaster();
	const planeIntersectPoint = new Vector3();

	function addNewItem(event: PointerEvent) {
		if (!$activeFurnitureItem) return;

		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(pointer, $camera);

		raycaster.ray.intersectPlane(floorPlane, planeIntersectPoint);

		const item = catalogItemToLocalItem($activeFurnitureItem);

		item.position[0] = planeIntersectPoint.x;
		item.position[2] = planeIntersectPoint.z;

		addItem(item);

		$activeFurnitureItem = undefined;
	}

	function deleteItem() {
		removeItems(Object.keys($selection.items));
	}

	onMount(() => {
		renderer.domElement.addEventListener('pointerdown', addNewItem);

		return () => {
			renderer.domElement.removeEventListener('pointerdown', addNewItem);
		};
	});

	const { onPointerEnter, onPointerLeave } = useCursor('copy', 'auto');

	$: if ($activeFurnitureItem) {
		onPointerEnter();
	} else {
		onPointerLeave();
	}
</script>

<svelte:window use:shortcut={[{ keys: ['Delete'], callback: deleteItem }]} />

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
