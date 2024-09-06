<script lang="ts">
	import Draggable from './Draggable/Draggable.svelte';
	// import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';

	import { layout } from '$lib/shared/store/layout';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import Object from './Object.svelte';
	import { models } from '$lib/shared/mocks/models';
	import type { FurnitureType } from '$lib/shared/API/furniture';
	import { selectedObjects } from '$lib/shared/store/selectedObjects';
	import { T } from '@threlte/core';

	interface Furniture {
		position: [number, number, number];
		rotation: number;
		dragging: boolean;
		name: string;
		url: string;
	}

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	let furniture: Furniture[] = [];

	for (const itemId in $layout.data.items) {
		const item = $layout.data.items[itemId];
		furniture.push({
			position: [item.x * 0.01, 0, -item.y * 0.01],
			rotation: item.rotation * DEG2RAD - 90 * DEG2RAD,
			dragging: false,
			name: item.name,
			url: models[item.catalog.type_sub.main_type as FurnitureType]
		});
	}

	$: $cameraEnabled = furniture.reduce((a, b) => a && !b.dragging, true);

	function deselect() {
		$selectedObjects.clear();
	}
</script>

<T.Group on:pointermissed={deselect}>
	{#each furniture as item (item)}
		<Draggable
			{floorPlane}
			bind:position={item.position}
			bind:rotation={item.rotation}
			bind:dragging={item.dragging}
		>
			<!-- <Info content={item.name} let:open> -->
			<!-- openInfo={open} -->
			<Object url={item.url} />
			<!-- </Info> -->
		</Draggable>
	{/each}
</T.Group>
