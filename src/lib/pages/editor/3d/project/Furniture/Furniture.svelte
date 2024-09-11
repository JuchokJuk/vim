<script lang="ts">
	import Draggable from './Draggable/Draggable.svelte';
	import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';
	import ObjectComponent from './Object.svelte';
	import { selectedObjects } from '$lib/shared/store/project/selectedObjects';
	import { T } from '@threlte/core';
	import { localItems } from '$lib/shared/SDK/state/localProject/localItems';

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	$: $cameraEnabled = Object.values($localItems).reduce((a, b) => a && !b.dragging, true);

	function unselect() {
		$selectedObjects.clear();
		$selectedObjects = $selectedObjects;
	}
</script>

<T.Group on:pointermissed={unselect}>
	{#each Object.keys($localItems) as itemId (itemId)}
		<Draggable
			{floorPlane}
			{itemId}
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
