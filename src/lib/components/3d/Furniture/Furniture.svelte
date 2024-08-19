<script lang="ts">
	import Bed from './Objects/Bed.svelte';
	import Draggable from './Draggable/Draggable.svelte';
	import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/store/cameraEnabled';
	import Chair from './Objects/Chair.svelte';
	import Desk from './Objects/Desk.svelte';

	type Furniture = {
		component: any;
		position: [number, number, number];
		rotation: number;
		dragging: boolean;
		name: string;
	};

	const furniture: Furniture[] = [
		{
			component: Bed,
			position: [-2, 0.0, -6.5],
			rotation: 0,
			dragging: false,
			name: 'Кровать'
		},
		{
			component: Chair,
			position: [-2, 0.0, -2.4],
			rotation: 0,
			dragging: false,
			name: 'Стул'
		},
		{
			component: Desk,
			position: [-2, 0.0, -3],
			rotation: 0,
			dragging: false,
			name: 'Стол'
		}
	];

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	$: $cameraEnabled = furniture.reduce((a, b) => a && !b.dragging, true);
</script>

{#each furniture as item}
	<Draggable
		{floorPlane}
		bind:position={item.position}
		bind:rotation={item.rotation}
		bind:dragging={item.dragging}
	>
		<Info content={item.name} let:open>
			<svelte:component this={item.component} openInfo={open} />
		</Info>
	</Draggable>
{/each}
